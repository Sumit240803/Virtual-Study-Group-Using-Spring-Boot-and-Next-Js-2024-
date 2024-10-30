package com.easyacademics.learningtool.services;

import com.easyacademics.learningtool.dto.Response;
import com.easyacademics.learningtool.models.Notes;
import com.easyacademics.learningtool.repository.NotesRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NotesService {
    private final NotesRepository notesRepository;

    public NotesService(NotesRepository notesRepository){
        this.notesRepository = notesRepository;
    }

    public Response getNote(String id){
        Optional<Notes> optNotes = notesRepository.findById(id);
        Response response = new Response();
        if(optNotes.isPresent()){
            Notes notes = optNotes.get();
            response.setNotes(List.of(notes));
        }else {
            response.setMessage("No notes present");
        }
        return response;
    }
}
