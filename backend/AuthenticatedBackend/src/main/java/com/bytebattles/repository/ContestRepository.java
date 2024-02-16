package com.bytebattles.repository;

import com.bytebattles.models.Contest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ContestRepository extends JpaRepository<Contest,Long> {
    Optional<Contest> findByTitle(String title);
}