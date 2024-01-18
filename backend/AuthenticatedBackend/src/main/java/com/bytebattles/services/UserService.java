package com.bytebattles.services;

import com.bytebattles.models.ApplicationUser;
import com.bytebattles.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("In the user details service");
        return userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("user is not valid"));
    }


    public List<ApplicationUser> getUsers() {
        return userRepository.findAll();
    }

    public ApplicationUser getUserById(String userId) {
        return userRepository.getOne(Integer.parseInt(userId));
    }

    public ApplicationUser addUser(ApplicationUser user) {
        return userRepository.save(user);
    }

    public ApplicationUser updateUser(ApplicationUser updatedUser) {
//        System.out.println(updatedUser);
        Integer userId = updatedUser.getUserId();
        if (!userRepository.existsById(userId)) {
            return null;
        }

        ApplicationUser existingUser = userRepository.getOne(userId);

        existingUser.setEmail(updatedUser.getEmail());
        existingUser.setName(updatedUser.getName());
        existingUser.setUsername(updatedUser.getUsername());
        existingUser.setUsername(updatedUser.getPassword());

        userRepository.save(existingUser);

        return existingUser;
    }

    public boolean deleteUser(String userId) {
        userRepository.deleteById(Integer.parseInt(userId));
        return true;
    }

}
