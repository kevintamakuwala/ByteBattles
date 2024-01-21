package com.bytebattles.models;

import java.util.Set;

public class AssignUserToContestDTO {
    Set<ApplicationUser> users;

    public AssignUserToContestDTO() {
        super();
    }

    public AssignUserToContestDTO(Set<ApplicationUser> users) {
        this.users = users;
    }

    public Set<ApplicationUser> getUsers() {
        return users;
    }

    public void setUsers(Set<ApplicationUser> users) {
        this.users = users;
    }

    @Override
    public String toString() {
        return "AssignUserToContestDTO{" +
                "applicationUserSet=" + users +
                '}';
    }
}
