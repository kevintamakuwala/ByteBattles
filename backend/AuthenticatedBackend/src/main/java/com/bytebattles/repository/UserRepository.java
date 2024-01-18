package com.bytebattles.repository;

import com.bytebattles.models.ApplicationUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<ApplicationUser, Integer> {
    Optional<ApplicationUser> findByUsername(String username);

    @Query("SELECT u FROM ApplicationUser u WHERE u.verificationCode = :code")
    public ApplicationUser findByVerificationCode(String code);
}
