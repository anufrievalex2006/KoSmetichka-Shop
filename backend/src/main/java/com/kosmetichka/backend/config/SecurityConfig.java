package com.kosmetichka.backend.config;

import com.kosmetichka.backend.models.api.User;
import com.kosmetichka.backend.repos.UserRepo;
import com.kosmetichka.backend.security.JwtFilter;
import com.kosmetichka.backend.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final JwtFilter filter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .cors(c -> c.configurationSource(corsConfigurationSource()))
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.GET,
                                "/api/products/**", "/api/categories/**", "/api/attributes/**",
                                "/api/brands/**", "/api/content/**", "/api/shops/**"
                        ).permitAll()

                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers(HttpMethod.POST,
                                "/api/appeals/questions", "/api/appeals/supplier-requests"
                        ).permitAll()

                        .requestMatchers("/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/files/**").hasAnyRole("ADMIN", "CREATOR")

                        .requestMatchers(HttpMethod.POST, "/api/products/**", "/api/categories/**",
                                "/api/attributes/**", "/api/brands/**", "/api/shops/**").hasAnyRole("ADMIN", "CREATOR")
                        .requestMatchers(HttpMethod.PATCH, "/api/products/**", "/api/categories/**",
                                "/api/attributes/**", "/api/brands/**", "/api/shops/**").hasAnyRole("ADMIN", "CREATOR")
                        .requestMatchers(HttpMethod.DELETE, "/api/products/**", "/api/categories/**",
                                "/api/attributes/**", "/api/brands/**", "/api/shops/**").hasAnyRole("ADMIN", "CREATOR")

                        .requestMatchers(HttpMethod.POST, "/api/content/**").hasAnyRole("ADMIN", "CREATOR")
                        .requestMatchers(HttpMethod.PATCH, "/api/content/**").hasAnyRole("ADMIN", "CREATOR")
                        .requestMatchers(HttpMethod.DELETE, "/api/content/**").hasAnyRole("ADMIN", "CREATOR")

                        .requestMatchers("/api/appeals/**").hasRole("ADMIN")

                        .requestMatchers("/api/users/me/**").authenticated()
                        .requestMatchers("/api/users/**").hasRole("ADMIN")

                        .requestMatchers("/api/cart/**").authenticated()

                        .anyRequest().authenticated()
                )
                .addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:3000"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
