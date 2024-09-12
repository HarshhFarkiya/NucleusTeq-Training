import unittest
import calc_functions
class TestCalcFunctions(unittest.TestCase):
	def test_add(self):
		result=calc_functions.add(10,5)
		self.assertEqual(result,15)
	def test_division(self):
		result=calc_functions.division(1,2)
		self.assertEqual(result,0.5)
	def test_multiplication(self):
		result=calc_functions.multiplication(10,20)
		self.assertEqual(result,200)
	def test_substraction(self):
		result=calc_functions.substraction(20,2)
		self.assertEqual(result,18)
	def test_string(self):
		result=calc_functions.string("Harrsh")
		self.assertIn(result,"Harsh Farkiya")
