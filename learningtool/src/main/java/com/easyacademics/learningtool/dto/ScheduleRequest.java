package com.easyacademics.learningtool.dto;

import lombok.Data;

import java.util.Date;
@Data
public class ScheduleRequest {
    private String name;
    private String note;
    private Date start;
    private Date end;
}
