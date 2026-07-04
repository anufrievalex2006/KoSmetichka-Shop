package com.kosmetichka.backend.security;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.time.Duration;
import java.util.Date;

@Service
public class JwtService {
    @Value("${jwt.secret}")
    private String secret;
    @Value("${jwt.access-token-expiration}")
    private long accessExpiration;
    @Value("${jwt.refresh-token-expiration}")
    private long refreshExpiration;

    private SecretKey getKey() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));
    }
    private String buildToken(String subject, long expiration, String type) {
        return Jwts.builder()
                .subject(subject)
                .claim("type", type)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getKey())
                .compact();
    }

    public String generateAccessToken(UserPrincipal pr) {
        return buildToken(pr.getUsername(), accessExpiration, "access");
    }
    public String generateRefreshToken(UserPrincipal pr) {
        return buildToken(pr.getUsername(), refreshExpiration, "refresh");
    }
    public String generateRefreshToken(UserPrincipal pr, Duration ttl, boolean rememberMe) {
        return Jwts.builder()
                .subject(pr.getUsername())
                .claim("type", "refresh")
                .claim("rememberMe", rememberMe)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + ttl.toMillis()))
                .signWith(getKey())
                .compact();
    }
    public boolean isTokenOfType(String token, String type) {
        try {
            String t = Jwts.parser()
                    .verifyWith(getKey())
                    .build()
                    .parseSignedClaims(token)
                    .getPayload()
                    .get("type", String.class);
            return type.equals(t);
        }
        catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
    public String extractEmail(String token) {
        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }
    public boolean extractRememberMe(String token) {
        Boolean x = Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .get("rememberMe", Boolean.class);
        return Boolean.TRUE.equals(x);
    }
    public boolean isTokenValid(String token) {
        try {
            Jwts.parser()
                    .verifyWith(getKey())
                    .build()
                    .parseSignedClaims(token);
            return true;
        }
        catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
}
