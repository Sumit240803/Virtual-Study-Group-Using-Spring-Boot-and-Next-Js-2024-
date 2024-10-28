package com.easyacademics.learningtool.controllers;

import com.easyacademics.learningtool.dto.Response;
import com.easyacademics.learningtool.services.NotesService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PublicController {
    private final NotesService notesService;
    public PublicController(NotesService notesService){
        this.notesService = notesService;
    }

    @GetMapping("/notes/{id}")
    public ResponseEntity<?> getNotes(@PathVariable String id){
       try{
           Response response = notesService.getNote(id);
           return ResponseEntity.ok().body(response.getNotes());
       } catch (Exception e) {
           Response response  = new Response();
           response.setMessage("Error");
           response.setError(e.getLocalizedMessage());
           return ResponseEntity.badRequest().body(response);
       }
    }
}
