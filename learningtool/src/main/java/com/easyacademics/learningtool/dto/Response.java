package com.easyacademics.learningtool.dto;

import com.easyacademics.learningtool.models.*;
import lombok.Data;

import java.util.List;

@Data
public class Response {
    private String message;
    private User user;
    private String error;
    private List<String> friends;
    private List<String> requests;
    private List<Notes> notes;
    private List<Schedule> schedules;
    private List<String> groups;
    private String userId;
    private List<Group> group;
    private List<Messages> messages;
}
