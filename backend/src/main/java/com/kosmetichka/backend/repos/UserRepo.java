package com.kosmetichka.backend.repos;

import com.kosmetichka.backend.models.api.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserRepo extends JpaRepository<User, UUID> {
    Optional<User> findByEmail(String email);
    @Query("SELECT CAST(u.createdAt AS date), COUNT(u) FROM User u GROUP BY CAST(u.createdAt AS date) ORDER BY CAST(u.createdAt AS date)")
    List<Object[]> countRegistrationsByDay();
}
