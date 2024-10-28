package com.easyacademics.learningtool.models;

import lombok.Data;
import org.springframework.data.annotation.Id;

import java.util.List;
@Data
public class Requests {
    @Id
    private String id;
    private User friend;
}
