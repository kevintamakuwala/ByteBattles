package com.bytebattles.models;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "users")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "userId")
public class ApplicationUser implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty("userId")
    private Integer userId;

    private String name;

    @Column(unique = true)
    private String email;
    @Column(unique = true)
    private String username;

    private String password;
    @Column(name = "verification_code", length = 64)
    private String verificationCode;
    private boolean enabled;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_role_junction",
            joinColumns = {@JoinColumn(name = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "role_id")}
    )
    private Set<Role> authorities;

    @OneToMany(mappedBy = "applicationUser", cascade = CascadeType.ALL)
    @JsonManagedReference(value = "user-submission")
    private List<Submission> submissionList;

    @JsonIgnore
    @ManyToMany(mappedBy = "applicationUserSet", fetch = FetchType.LAZY)
    private Set<Contest> contestSet = new HashSet<>();

//    constructors
    public ApplicationUser() {
        super();
        authorities = new HashSet<>();
    }

    public ApplicationUser(Integer userId, String name, String email, String username, String password, String verificationCode, boolean enabled, Set<Role> authorities, List<Submission> submissionList) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.username = username;
        this.password = password;
        this.verificationCode = verificationCode;
        this.enabled = enabled;
        this.authorities = authorities;
        this.submissionList = submissionList;
    }

    public ApplicationUser(Integer userId, String name, String email, String username, String password, String verificationCode, boolean enabled, Set<Role> authorities, List<Submission> submissions, Set<Contest> contestSet) {
        super();
        this.userId = userId;
        this.username = username;
        this.email = email;
        this.name = name;
        this.password = password;
        this.verificationCode = verificationCode;
        this.enabled = enabled;
        this.authorities = authorities;
        this.submissionList = submissions;
        if (submissions != null) {
            for (Submission submission : submissions) {
                submission.setApplicationUser(this);
            }
        }
        if (contestSet != null)
            this.contestSet = contestSet;
    }

//    Getters and Setters
    public Integer getUserId() {
        return this.userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setId(Integer userId) {
        this.userId = userId;
    }

    public void setAuthorities(Set<Role> authorities) {
        this.authorities = authorities;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }


    public List<Submission> getSubmissionList() {
        return submissionList;
    }

    public void setSubmissionList(List<Submission> submissionList) {
        this.submissionList = submissionList;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getVerificationCode() {
        return verificationCode;
    }

    public void setVerificationCode(String verificationCode) {
        this.verificationCode = verificationCode;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public Set<Contest> getContestSet() {
        return contestSet;
    }

    public void setContestSet(Set<Contest> contestSet) {
        this.contestSet = contestSet;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return this.enabled;
    }

    @Override
    public String toString() {
        return "ApplicationUser{" +
                "userId=" + userId +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", verificationCode='" + verificationCode + '\'' +
                ", enabled=" + enabled +
                ", authorities=" + authorities +
                ", submissionList=" + submissionList +
                ", contestSet=" + contestSet +
                '}';
    }
}
