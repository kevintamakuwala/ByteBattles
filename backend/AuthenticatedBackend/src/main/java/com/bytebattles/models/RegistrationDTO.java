package com.bytebattles.models;

public class RegistrationDTO {
    private String name;
    private String email;
    private String username;
    private String password;
    private String verificationCode;
    private boolean enabled;

    public RegistrationDTO() {
        super();
    }

    public RegistrationDTO(String name, String email, String username, String password, String verificationCode, boolean enabled) {
        super();
        this.name = name;
        this.email = email;
        this.username = username;
        this.password = password;
        this.verificationCode = verificationCode;
        this.enabled = enabled;
    }

    public String getVerificationCode() {
        return verificationCode;
    }

    public void setVerificationCode(String verificationCode) {
        this.verificationCode = verificationCode;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public String getUsername() {
        return this.username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "RegistrationDTO{" +
                "name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
