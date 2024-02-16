package com.bytebattles.controllers;

import com.bytebattles.models.AssignProblemToContestDTO;
import com.bytebattles.models.AssignUserToContestDTO;
import com.bytebattles.models.Contest;
import com.bytebattles.services.ContestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/contests")
public class ContestController {

    @Autowired
    private ContestService contestService;

    @GetMapping({"/", ""})
    public ResponseEntity<List<Contest>> getContests() {
        List<Contest> contests = contestService.getContests();
        return new ResponseEntity<>(contests, HttpStatus.OK);
    }

    @GetMapping({"/{contestId}", "/{contestId}/"})
    public ResponseEntity<Contest> getContestById(@PathVariable String contestId) {
        Contest contest = contestService.getContestById(contestId);
        if (contest != null) {
            return new ResponseEntity<>(contest, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping({"/title/{contestTitle}", "/title/{contestTitle}/"})
    public ResponseEntity<Contest> getContestByTitle(@PathVariable String contestTitle) {
        Contest contest = contestService.getContestByTitle(contestTitle);
        if (contest != null) {
            return new ResponseEntity<>(contest, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping({"/", ""})
    public ResponseEntity<Contest> addContest(@RequestBody Contest contest) {
        Contest addedContest = contestService.addContest(contest);
        return new ResponseEntity<>(addedContest, HttpStatus.CREATED);
    }

    @PutMapping({"/{contestId}", "/{contestId}/"})
    public ResponseEntity<Contest> updateContest(@PathVariable String contestId, @RequestBody Contest updatedContest) {
        updatedContest.setContestId(Long.parseLong(contestId));

        Contest updated = contestService.updateContest(updatedContest);

        if (updated != null) {
            return new ResponseEntity<>(updated, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping({"/{contestId}", "/{contestId}/"})
    public ResponseEntity<Void> deleteContest(@PathVariable String contestId) {
        boolean deleted = contestService.deleteContest(contestId);
        if (deleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping({"/{contestId}/problems/{problemId}", "/{contestId}/problems/{problemId}/"})
    public Contest assignProblemToContest(@PathVariable Long contestId,
                                          @PathVariable Long problemId) {
        return contestService.assignProblemToContest(contestId, problemId);
    }

    @PutMapping({"/{contestId}/problems", "/{contestId}/problems/"})
    public Contest assignProblemsToContest(@PathVariable Long contestId,
                                           @RequestBody AssignProblemToContestDTO assignProblemToContestDTO) {
        return contestService.assignProblemToContest(contestId, assignProblemToContestDTO);
    }

    @PutMapping({"/{contestId}/users/{userId}", "/{contestId}/users/{userId}/"})
    public Contest assignUserToContest(@PathVariable Long contestId,
                                       @PathVariable Integer userId) {
        return contestService.assignUserToContest(contestId, userId);
    }
    @PutMapping({"/{contestId}/users", "/{contestId}/users/"})
    public Contest assignUsersToContest(@PathVariable Long contestId,
                                        @RequestBody AssignUserToContestDTO assignUserToContestDTO) {
        return contestService.assignUserToContest(contestId, assignUserToContestDTO);
    }

}