package com.easyacademics.learningtool.dto;

import com.easyacademics.learningtool.models.Notes;
import com.easyacademics.learningtool.models.User;
import lombok.Data;

import java.util.List;

@Data
public class Response {
    private String message;
    private User user;
    private String error;
    private List<User> friends;
    private List<User> requests;
    private List<Notes> notes;
}
