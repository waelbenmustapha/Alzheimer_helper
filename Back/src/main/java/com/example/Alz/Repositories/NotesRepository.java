package com.example.Alz.Repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.Alz.Entities.Notes;

@Repository
public interface NotesRepository extends JpaRepository<Notes, String> {

  public List<Notes> findByDementiaId(String id);
}
