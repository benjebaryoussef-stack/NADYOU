#!/usr/bin/env python3
"""
Comprehensive Backend API Testing for Fitness Tracking Application
Tests all endpoints including auth, workouts, nutrition, progress, AI, and payments
"""

import requests
import sys
import json
from datetime import datetime
from typing import Dict, Any, Optional

class FitnessAPITester:
    def __init__(self, base_url: str = "https://mon-coach-fitness-1.preview.emergentagent.com"):
        self.base_url = base_url
        self.token = None
        self.user_data = None
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name: str, success: bool, details: str = ""):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
        
        result = {
            "test": name,
            "success": success,
            "details": details,
            "timestamp": datetime.now().isoformat()
        }
        self.test_results.append(result)
        
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} - {name}")
        if details:
            print(f"    {details}")

    def make_request(self, method: str, endpoint: str, data: Optional[Dict] = None, 
                    expected_status: int = 200, auth_required: bool = True) -> tuple[bool, Dict]:
        """Make HTTP request with error handling"""
        url = f"{self.base_url}/api/{endpoint}"
        headers = {'Content-Type': 'application/json'}
        
        if auth_required and self.token:
            headers['Authorization'] = f'Bearer {self.token}'
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=30)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=30)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers, timeout=30)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=30)
            
            success = response.status_code == expected_status
            
            try:
                response_data = response.json()
            except:
                response_data = {"raw_response": response.text}
            
            if not success:
                print(f"    Expected {expected_status}, got {response.status_code}")
                print(f"    Response: {response_data}")
            
            return success, response_data
            
        except requests.exceptions.RequestException as e:
            print(f"    Request failed: {str(e)}")
            return False, {"error": str(e)}

    def test_auth_register(self) -> bool:
        """Test user registration"""
        timestamp = int(datetime.now().timestamp())
        test_user = {
            "email": f"test_user_{timestamp}@example.com",
            "password": "TestPassword123!",
            "name": f"Test User {timestamp}"
        }
        
        success, response = self.make_request(
            'POST', 'auth/register', test_user, 200, auth_required=False
        )
        
        if success and 'access_token' in response:
            self.token = response['access_token']
            self.user_data = response['user']
            self.log_test("User Registration", True, f"User ID: {self.user_data['id']}")
            return True
        else:
            self.log_test("User Registration", False, f"Response: {response}")
            return False

    def test_auth_login(self) -> bool:
        """Test user login with existing credentials"""
        if not self.user_data:
            self.log_test("User Login", False, "No user data available")
            return False
        
        # Extract email from user_data for login test
        login_data = {
            "email": self.user_data['email'],
            "password": "TestPassword123!"
        }
        
        success, response = self.make_request(
            'POST', 'auth/login', login_data, 200, auth_required=False
        )
        
        if success and 'access_token' in response:
            self.log_test("User Login", True, "Login successful")
            return True
        else:
            self.log_test("User Login", False, f"Response: {response}")
            return False

    def test_auth_me(self) -> bool:
        """Test get current user info"""
        success, response = self.make_request('GET', 'auth/me')
        
        if success and 'id' in response:
            self.log_test("Get User Info", True, f"User: {response['name']}")
            return True
        else:
            self.log_test("Get User Info", False, f"Response: {response}")
            return False

    def test_exercises_list(self) -> bool:
        """Test get exercises library"""
        success, response = self.make_request('GET', 'exercises')
        
        if success and isinstance(response, list) and len(response) >= 8:
            exercise_names = [ex['name'] for ex in response[:3]]
            self.log_test("Get Exercises Library", True, f"Found {len(response)} exercises: {', '.join(exercise_names)}...")
            return True
        else:
            self.log_test("Get Exercises Library", False, f"Expected list with 8+ exercises, got: {response}")
            return False

    def test_exercise_detail(self) -> bool:
        """Test get specific exercise"""
        success, response = self.make_request('GET', 'exercises/ex001')
        
        if success and 'name' in response and 'muscle_group' in response:
            self.log_test("Get Exercise Detail", True, f"Exercise: {response['name']} - {response['muscle_group']}")
            return True
        else:
            self.log_test("Get Exercise Detail", False, f"Response: {response}")
            return False

    def test_workout_create(self) -> bool:
        """Test create workout log"""
        workout_data = {
            "exercise_id": "ex001",
            "exercise_name": "Développé Couché",
            "sets": 3,
            "reps": 10,
            "weight": 80.5,
            "duration_seconds": 120,
            "notes": "Test workout from API"
        }
        
        success, response = self.make_request('POST', 'workouts', workout_data, 200)
        
        if success and 'id' in response:
            self.log_test("Create Workout Log", True, f"Workout ID: {response['id']}")
            return True
        else:
            self.log_test("Create Workout Log", False, f"Response: {response}")
            return False

    def test_workouts_list(self) -> bool:
        """Test get workout logs"""
        success, response = self.make_request('GET', 'workouts')
        
        if success and isinstance(response, list):
            self.log_test("Get Workout Logs", True, f"Found {len(response)} workout logs")
            return True
        else:
            self.log_test("Get Workout Logs", False, f"Response: {response}")
            return False

    def test_workout_stats(self) -> bool:
        """Test get workout statistics"""
        success, response = self.make_request('GET', 'workouts/stats')
        
        if success and 'total_workouts' in response:
            self.log_test("Get Workout Stats", True, f"Total workouts: {response['total_workouts']}")
            return True
        else:
            self.log_test("Get Workout Stats", False, f"Response: {response}")
            return False

    def test_nutrition_create(self) -> bool:
        """Test create nutrition log"""
        nutrition_data = {
            "meal_name": "Test Breakfast",
            "calories": 450.0,
            "proteins": 25.0,
            "carbs": 40.0,
            "fats": 15.0,
            "amino_acids": {
                "leucine": 2.5,
                "isoleucine": 1.2,
                "valine": 1.8
            }
        }
        
        success, response = self.make_request('POST', 'nutrition', nutrition_data, 200)
        
        if success and 'id' in response:
            self.log_test("Create Nutrition Log", True, f"Nutrition ID: {response['id']}")
            return True
        else:
            self.log_test("Create Nutrition Log", False, f"Response: {response}")
            return False

    def test_nutrition_list(self) -> bool:
        """Test get nutrition logs"""
        success, response = self.make_request('GET', 'nutrition')
        
        if success and isinstance(response, list):
            self.log_test("Get Nutrition Logs", True, f"Found {len(response)} nutrition logs")
            return True
        else:
            self.log_test("Get Nutrition Logs", False, f"Response: {response}")
            return False

    def test_nutrition_stats(self) -> bool:
        """Test get nutrition statistics"""
        success, response = self.make_request('GET', 'nutrition/stats?days=7')
        
        if success and 'total_calories' in response:
            self.log_test("Get Nutrition Stats", True, f"7-day calories: {response['total_calories']}")
            return True
        else:
            self.log_test("Get Nutrition Stats", False, f"Response: {response}")
            return False

    def test_progress_overview(self) -> bool:
        """Test get progress overview"""
        success, response = self.make_request('GET', 'progress/overview')
        
        if success and 'workout_progression' in response:
            self.log_test("Get Progress Overview", True, f"Total workouts: {response.get('total_workouts', 0)}")
            return True
        else:
            self.log_test("Get Progress Overview", False, f"Response: {response}")
            return False

    def test_ai_recommendations_without_premium(self) -> bool:
        """Test AI recommendations without premium (should fail)"""
        ai_request = {
            "context": "Je m'entraîne 3 fois par semaine mais je stagne",
            "user_goal": "Progresser en force"
        }
        
        success, response = self.make_request('POST', 'ai/recommendations', ai_request, 403)
        
        if not success and response.get('detail') == 'Premium subscription required for AI recommendations':
            self.log_test("AI Recommendations (Non-Premium)", True, "Correctly blocked non-premium user")
            return True
        else:
            self.log_test("AI Recommendations (Non-Premium)", False, f"Expected 403, got: {response}")
            return False

    def test_stripe_checkout_creation(self) -> bool:
        """Test Stripe checkout session creation"""
        checkout_data = {
            "package_id": "monthly",
            "origin_url": "https://mon-coach-fitness-1.preview.emergentagent.com"
        }
        
        success, response = self.make_request('POST', 'payments/checkout', checkout_data, 200)
        
        if success and 'url' in response and 'session_id' in response:
            self.log_test("Create Stripe Checkout", True, f"Session ID: {response['session_id']}")
            return True
        else:
            self.log_test("Create Stripe Checkout", False, f"Response: {response}")
            return False

    def run_all_tests(self) -> Dict[str, Any]:
        """Run all backend tests"""
        print("🚀 Starting Fitness App Backend API Tests")
        print(f"📍 Testing against: {self.base_url}")
        print("=" * 60)
        
        # Authentication Tests
        print("\n🔐 AUTHENTICATION TESTS")
        self.test_auth_register()
        self.test_auth_login()
        self.test_auth_me()
        
        # Exercise Tests
        print("\n💪 EXERCISE TESTS")
        self.test_exercises_list()
        self.test_exercise_detail()
        
        # Workout Tests
        print("\n🏋️ WORKOUT TESTS")
        self.test_workout_create()
        self.test_workouts_list()
        self.test_workout_stats()
        
        # Nutrition Tests
        print("\n🍎 NUTRITION TESTS")
        self.test_nutrition_create()
        self.test_nutrition_list()
        self.test_nutrition_stats()
        
        # Progress Tests
        print("\n📈 PROGRESS TESTS")
        self.test_progress_overview()
        
        # AI Tests (Premium)
        print("\n🤖 AI TESTS")
        self.test_ai_recommendations_without_premium()
        
        # Payment Tests
        print("\n💳 PAYMENT TESTS")
        self.test_stripe_checkout_creation()
        
        # Summary
        print("\n" + "=" * 60)
        print(f"📊 RESULTS: {self.tests_passed}/{self.tests_run} tests passed")
        success_rate = (self.tests_passed / self.tests_run * 100) if self.tests_run > 0 else 0
        print(f"📈 Success Rate: {success_rate:.1f}%")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All tests passed!")
        else:
            print("⚠️  Some tests failed - check details above")
        
        return {
            "total_tests": self.tests_run,
            "passed_tests": self.tests_passed,
            "success_rate": success_rate,
            "test_results": self.test_results
        }

def main():
    """Main test execution"""
    tester = FitnessAPITester()
    results = tester.run_all_tests()
    
    # Return appropriate exit code
    return 0 if results["passed_tests"] == results["total_tests"] else 1

if __name__ == "__main__":
    sys.exit(main())