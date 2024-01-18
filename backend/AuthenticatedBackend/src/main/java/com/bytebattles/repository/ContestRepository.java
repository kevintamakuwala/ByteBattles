package com.bytebattles.repository;

import com.bytebattles.models.Contest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContestRepository extends JpaRepository<Contest,Long> {
}
