package com.bytebattles.services;

import com.bytebattles.models.Problem;
import com.bytebattles.models.Submission;

import java.util.List;

public interface SubmissionService {
    public List<Submission> getSubmissions();
    public Submission getSubmissionById(String submissionId);
    public Submission addSubmission(Submission submission);
    public Submission updateSubmission(Submission submission);
    public boolean deleteSubmission(String submissionId);

}
