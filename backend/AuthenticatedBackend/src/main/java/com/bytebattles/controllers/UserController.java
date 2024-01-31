package com.bytebattles.controllers;

import com.bytebattles.models.ApplicationUser;
import com.bytebattles.models.Submission;
import com.bytebattles.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping({"/", ""})
    public ResponseEntity<List<ApplicationUser>> getUsers() {
        List<ApplicationUser> users = userService.getUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping({"/{userId}/", "/{userId}"})
    public ResponseEntity<ApplicationUser> getUserById(@PathVariable String userId) {
        ApplicationUser user = userService.getUserById(userId);
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping({"/", ""})
    public ResponseEntity<ApplicationUser> addUser(@RequestBody ApplicationUser user) {
        Set<Submission> submissions = user.getSubmissionList();
        if (submissions != null) {
            for (Submission submission : submissions) {
                submission.setApplicationUser(user);
            }
        }
        ApplicationUser addedUser = userService.addUser(user);
        return new ResponseEntity<>(addedUser, HttpStatus.CREATED);
    }

    @PutMapping({"/{userId}/", "/{userId}"})
    public ResponseEntity<ApplicationUser> updateUser(@PathVariable String userId, @RequestBody ApplicationUser updatedUser) {
        updatedUser.setUserId(Integer.parseInt(userId));
        ApplicationUser updated = userService.updateUser(updatedUser);

        if (updated != null) {
            return new ResponseEntity<>(updated, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping({"/{userId}/", "/{userId}"})
    public ResponseEntity<Void> deleteUser(@PathVariable String userId) {
        boolean deleted = userService.deleteUser(userId);
        if (deleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
