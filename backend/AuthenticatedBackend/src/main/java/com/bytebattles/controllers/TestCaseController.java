package com.bytebattles.controllers;

import com.bytebattles.models.TestCase;
import com.bytebattles.services.TestCaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/testcases")
public class TestCaseController {
    @Autowired
    private TestCaseService testCaseService;

    @GetMapping({"/", ""})
    public ResponseEntity<List<TestCase>> getTestCases() {
        List<TestCase> testCases = testCaseService.getTestCases();
        return new ResponseEntity<>(testCases, HttpStatus.OK);
    }

    @GetMapping({"/{testCaseId}/", "/{testCaseId}"})
    public ResponseEntity<TestCase> getTestCaseById(@PathVariable String testCaseId) {
        TestCase testCase = testCaseService.getTestCaseById(testCaseId);
        if (testCase != null) {
            return new ResponseEntity<>(testCase, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping({"/", ""})
    public ResponseEntity<TestCase> addTestCase(@RequestBody TestCase testCase) {
        TestCase addedTestCase = testCaseService.addTestCase(testCase);
        return new ResponseEntity<>(addedTestCase, HttpStatus.CREATED);
    }

    @PutMapping({"/{testCaseId}/", "/{testCaseId}"})
    public ResponseEntity<TestCase> updateTestCase(@PathVariable String testCaseId, @RequestBody TestCase updatedTestCase) {
        updatedTestCase.setTestCaseId(Long.parseLong(testCaseId));
        TestCase testCase = testCaseService.updateTestCase(updatedTestCase);

        if (testCase != null) {
            return new ResponseEntity<>(testCase, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping({"/{testCaseId}/", "/{testCaseId}"})
    public ResponseEntity<Void> deleteTestCase(@PathVariable String testCaseId) {
        boolean deleted = testCaseService.deleteTestCase(testCaseId);
        if (deleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
