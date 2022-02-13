package com.example.Alz.Repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.Alz.Entities.Demantia;
@Repository
public interface DemantiaRepository extends JpaRepository<Demantia, String> {
public Demantia findByName(String s);
}
