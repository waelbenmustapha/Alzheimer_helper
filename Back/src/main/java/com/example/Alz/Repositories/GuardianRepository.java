package com.example.Alz.Repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.Alz.Entities.Guardian;
@Repository
public interface GuardianRepository extends JpaRepository<Guardian, String> {
public Guardian findByEmail(String s);
public Guardian findByVerificationCode(String s);
}
