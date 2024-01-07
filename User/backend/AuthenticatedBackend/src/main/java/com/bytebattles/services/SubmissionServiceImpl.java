package com.bytebattles.services;

import com.bytebattles.models.Submission;
import com.bytebattles.repository.ProblemRepository;
import com.bytebattles.repository.SubmissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SubmissionServiceImpl implements SubmissionService {
    @Autowired
    public SubmissionRepository submissionRepository;
    @Autowired
    public ProblemRepository problemRepository;

    @Override
    public List<Submission> getSubmissions() {
        return submissionRepository.findAll();
    }

    @Override
    public Submission getSubmissionById(String submissionId) {
        return submissionRepository.findById(Long.parseLong(submissionId)).get();
    }

    @Override
    public Submission addSubmission(Submission submission) {
        return submissionRepository.save(submission);
    }

    @Override
    public Submission updateSubmission(Submission submission) {
        submission.setSubmissionDate(LocalDateTime.now());
        return submissionRepository.save(submission);
    }

    @Override
    public boolean deleteSubmission(String submissionId) {
        submissionRepository.deleteById(Long.parseLong(submissionId));
        return true;
    }
}
