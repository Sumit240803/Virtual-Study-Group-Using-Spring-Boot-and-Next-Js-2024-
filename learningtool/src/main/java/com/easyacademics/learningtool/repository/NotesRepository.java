package com.easyacademics.learningtool.repository;

import com.easyacademics.learningtool.models.Notes;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotesRepository extends MongoRepository<Notes , String> {
    Notes findBySubject(String subject);
}
