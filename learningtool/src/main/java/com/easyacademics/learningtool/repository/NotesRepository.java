package com.easyacademics.learningtool.repository;

import com.easyacademics.learningtool.models.Notes;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface NotesRepository extends MongoRepository<Notes , String> {
    Notes findBySubject(String subject);
}
