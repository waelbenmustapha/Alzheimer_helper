package com.example.Alz.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.Alz.Entities.Dementia;

@Repository
public interface DementiaRepository extends JpaRepository<Dementia, String> {

  public Dementia findByName(String s);

  public Dementia findByVerificationCode(String s);

  public Dementia findByEmail(String email);
}
