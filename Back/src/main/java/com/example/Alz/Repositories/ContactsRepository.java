package com.example.Alz.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.Alz.Entities.Contacts;

@Repository
public interface ContactsRepository extends JpaRepository<Contacts,String> {

}
