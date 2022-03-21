package com.example.Alz.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Alz.Entities.PendingNotes;

public interface PendingNotesRepository extends JpaRepository<PendingNotes,String> {

}
