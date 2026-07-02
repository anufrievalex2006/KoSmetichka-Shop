This file is a merged representation of the entire codebase, combined into a single document by Repomix.

<file_summary>
This section contains a summary of this file.

<purpose>
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.
</purpose>

<file_format>
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  - File path as an attribute
  - Full contents of the file
</file_format>

<usage_guidelines>
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.
</usage_guidelines>

<notes>
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)
</notes>

</file_summary>

<directory_structure>
BackendApplication.java
config/MinIOConfig.java
config/OpenApiConfig.java
config/SecurityConfig.java
config/UserDetailsServiceImpl.java
controllers/AppealController.java
controllers/AttributeController.java
controllers/AuthController.java
controllers/BrandController.java
controllers/CartController.java
controllers/CategoryController.java
controllers/ContentCardController.java
controllers/FileController.java
controllers/ProductController.java
controllers/ShopController.java
controllers/UserController.java
dtos/requests/create/AppealCreateDto.java
dtos/requests/create/AttributeCreateDto.java
dtos/requests/create/AttributeValueCreateDto.java
dtos/requests/create/BrandCreateDto.java
dtos/requests/create/CartPositionCreateDto.java
dtos/requests/create/CategoryCreateDto.java
dtos/requests/create/ClientQuestionCreateDto.java
dtos/requests/create/ContentCardCreateDto.java
dtos/requests/create/LoginDto.java
dtos/requests/create/ProductCreateDto.java
dtos/requests/create/RegisterDto.java
dtos/requests/create/ShopContactCreateDto.java
dtos/requests/create/ShopCreateDto.java
dtos/requests/create/SupplierRequestCreateDto.java
dtos/requests/filter/ProductFilterDto.java
dtos/requests/filter/ProductSpecification.java
dtos/requests/reset_password/ForgotPasswordDto.java
dtos/requests/reset_password/ResetPasswordDto.java
dtos/requests/update/AppealUpdateDto.java
dtos/requests/update/AttributeUpdateDto.java
dtos/requests/update/AttributeValueUpdateDto.java
dtos/requests/update/BrandUpdateDto.java
dtos/requests/update/CartPositionUpdateDto.java
dtos/requests/update/CategoryUpdateDto.java
dtos/requests/update/ContentCardUpdateDto.java
dtos/requests/update/PasswordUpdateDto.java
dtos/requests/update/ProductUpdateDto.java
dtos/requests/update/ShopUpdateDto.java
dtos/requests/update/UserUpdateDto.java
dtos/responses/AppealResponse.java
dtos/responses/AttributeResponse.java
dtos/responses/AttributeValueResponse.java
dtos/responses/AuthResponse.java
dtos/responses/BrandResponse.java
dtos/responses/CartPositionResponse.java
dtos/responses/CartResponse.java
dtos/responses/CategoryResponse.java
dtos/responses/ClientQuestionResponse.java
dtos/responses/ContentCardResponse.java
dtos/responses/PageResponse.java
dtos/responses/ProductResponse.java
dtos/responses/ShopContactResponse.java
dtos/responses/ShopResponse.java
dtos/responses/StatisticsResponse.java
dtos/responses/SupplierRequestResponse.java
dtos/responses/UserResponse.java
models/api/Appeal.java
models/api/Attribute.java
models/api/AttributeValue.java
models/api/Brand.java
models/api/Cart.java
models/api/CartPosition.java
models/api/Category.java
models/api/ClientQuestion.java
models/api/ContentCard.java
models/api/PasswordResetToken.java
models/api/Product.java
models/api/Shop.java
models/api/ShopContact.java
models/api/SupplierRequest.java
models/api/User.java
models/enums/AppealStatus.java
models/enums/AttributeType.java
models/enums/ContactType.java
models/enums/ContentType.java
models/enums/UserRole.java
repos/AppealRepo.java
repos/AttributeRepo.java
repos/AttributeValueRepo.java
repos/BrandRepo.java
repos/CartPositionRepo.java
repos/CartRepo.java
repos/CategoryRepo.java
repos/ClientQuestionRepo.java
repos/ContentCardRepo.java
repos/PasswordResetTokenRepo.java
repos/ProductRepo.java
repos/ShopContactRepo.java
repos/ShopRepo.java
repos/SupplierRequestRepo.java
repos/UserRepo.java
security/JwtFilter.java
security/JwtService.java
security/UserPrincipal.java
services/AppealService.java
services/AttributeService.java
services/AuthService.java
services/BrandService.java
services/CartService.java
services/CategoryService.java
services/ContentCardService.java
services/EmailService.java
services/FileStorageService.java
services/PasswordResetService.java
services/ProductService.java
services/ShopService.java
services/UserService.java
utilities/exceptions/BadRequestException.java
utilities/exceptions/ForbiddenException.java
utilities/exceptions/GlobalExceptionHandler.java
utilities/exceptions/NotFoundException.java
utilities/mappers/AppealMapper.java
utilities/mappers/AttributeMapper.java
utilities/mappers/AttributeValueMapper.java
utilities/mappers/BrandMapper.java
utilities/mappers/CartMapper.java
utilities/mappers/CartPositionMapper.java
utilities/mappers/CategoryMapper.java
utilities/mappers/ContentCardMapper.java
utilities/mappers/ProductMapper.java
utilities/mappers/ShopContactMapper.java
utilities/mappers/ShopMapper.java
utilities/mappers/UserMapper.java
</directory_structure>

<files>
This section contains the contents of the repository's files.

<file path="BackendApplication.java">
package com.kosmetichka.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

}
</file>

<file path="config/MinIOConfig.java">
package com.kosmetichka.backend.config;

import io.minio.BucketExistsArgs;
import io.minio.MakeBucketArgs;
import io.minio.MinioClient;
import io.minio.SetBucketPolicyArgs;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MinIOConfig {
    @Value("${minio.url}")
    private String url;
    @Value("${minio.access-key}")
    private String accessKey;
    @Value("${minio.secret-key}")
    private String secretKey;
    @Value("${minio.bucket}")
    private String bucket;

    @Bean
    public MinioClient minioClient() {
        MinioClient client = MinioClient.builder()
                .endpoint(url)
                .credentials(accessKey, secretKey)
                .build();

        try {
            boolean exists = client.bucketExists(BucketExistsArgs.builder().bucket(bucket).build());
            if (!exists) {
                client.makeBucket(MakeBucketArgs.builder().bucket(bucket).build());
                String policy = """
                        {
                            "Version": "2012-10-17",
                            "Statement": [{
                                "Effect": "Allow",
                                "Principal": {"AWS": ["*"]},
                                "Action": ["s3:GetObject"],
                                "Resource": ["arn:aws:s3:::%s/*"]
                            }]
                        }
                        """.formatted(bucket);
                client.setBucketPolicy(SetBucketPolicyArgs.builder().bucket(bucket).config(policy).build());
            }
        } catch (Exception e) {
            throw new RuntimeException("Не удалось инициализировать MinIO Bucket", e);
        }
        return client;
    }
}
</file>

<file path="config/OpenApiConfig.java">
package com.kosmetichka.backend.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(title = "Kosmetichka Shop API", version = "1.0")
)
public class OpenApiConfig {
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .components(new Components().addSecuritySchemes("bearerAuth",
                        new SecurityScheme()
                                .type(SecurityScheme.Type.HTTP)
                                .scheme("bearer")
                                .bearerFormat("JWT")))
                .addSecurityItem(new SecurityRequirement().addList("bearerAuth"));
    }
}
</file>

<file path="config/SecurityConfig.java">
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
</file>

<file path="config/UserDetailsServiceImpl.java">
package com.kosmetichka.backend.config;

import com.kosmetichka.backend.models.api.User;
import com.kosmetichka.backend.repos.UserRepo;
import com.kosmetichka.backend.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserRepo repo;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User u = repo.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("user not found"));
        return new UserPrincipal(u);
    }
}
</file>

<file path="controllers/AppealController.java">
package com.kosmetichka.backend.controllers;

import com.kosmetichka.backend.dtos.requests.create.ClientQuestionCreateDto;
import com.kosmetichka.backend.dtos.requests.create.SupplierRequestCreateDto;
import com.kosmetichka.backend.dtos.requests.update.AppealUpdateDto;
import com.kosmetichka.backend.dtos.responses.AppealResponse;
import com.kosmetichka.backend.services.AppealService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/appeals")
@RequiredArgsConstructor
public class AppealController {
    private final AppealService service;

    @GetMapping
    public ResponseEntity<List<AppealResponse>> getAll() {
        return ResponseEntity.ok(service.get());
    }
    @PostMapping("/questions")
    public ResponseEntity<AppealResponse> createQuestion(@Valid  @RequestBody ClientQuestionCreateDto req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.createQuestion(req));
    }
    @PostMapping("/supplier-requests")
    public ResponseEntity<AppealResponse> createSupplierRequest(@Valid @RequestBody SupplierRequestCreateDto req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.createSupplierRequest(req));
    }
    @PatchMapping("/{id}/status")
    public ResponseEntity<AppealResponse> updateStatus(@PathVariable UUID id, @Valid @RequestBody AppealUpdateDto req) {
        return ResponseEntity.ok(service.updateStatus(id, req));
    }
}
</file>

<file path="controllers/AttributeController.java">
package com.kosmetichka.backend.controllers;

import com.kosmetichka.backend.dtos.requests.create.AttributeCreateDto;
import com.kosmetichka.backend.dtos.requests.update.AttributeUpdateDto;
import com.kosmetichka.backend.dtos.responses.AttributeResponse;
import com.kosmetichka.backend.services.AttributeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/attributes")
@RequiredArgsConstructor
public class AttributeController {
    private final AttributeService service;

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<AttributeResponse>> getByCategory(@PathVariable UUID categoryId) {
        return ResponseEntity.ok(service.getByCategory(categoryId));
    }
    @PostMapping
    public ResponseEntity<AttributeResponse> create(@Valid  @RequestBody AttributeCreateDto req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(req));
    }
    @PatchMapping("/{id}")
    public ResponseEntity<AttributeResponse> update(@PathVariable UUID id, @Valid @RequestBody AttributeUpdateDto req) {
        return ResponseEntity.ok(service.update(id, req));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }
}
</file>

<file path="controllers/AuthController.java">
package com.kosmetichka.backend.controllers;

import com.kosmetichka.backend.dtos.requests.create.LoginDto;
import com.kosmetichka.backend.dtos.requests.create.RegisterDto;
import com.kosmetichka.backend.dtos.requests.reset_password.ForgotPasswordDto;
import com.kosmetichka.backend.dtos.requests.reset_password.ResetPasswordDto;
import com.kosmetichka.backend.dtos.responses.AuthResponse;
import com.kosmetichka.backend.services.AuthService;
import com.kosmetichka.backend.services.PasswordResetService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService service;
    private final PasswordResetService resetService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid  @RequestBody RegisterDto req, HttpServletResponse res) {
        AuthResponse tokens = service.register(req);
        setAuthCookies(res, tokens);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginDto req, HttpServletResponse res) {
        AuthResponse tokens = service.login(req);
        setAuthCookies(res, tokens);
        return ResponseEntity.ok().build();
    }
    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refresh(@CookieValue("refreshToken") String refreshToken, HttpServletResponse res) {
        AuthResponse tokens = service.refresh(refreshToken);
        setAuthCookies(res, tokens);
        return ResponseEntity.ok().build();
    }
    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletResponse res) {
        clearAuthCookies(res);
        return ResponseEntity.noContent().build();
    }
    @PostMapping("/password/forgot")
    public ResponseEntity<Void> forgotPassword(@Valid @RequestBody ForgotPasswordDto req) {
        resetService.requestReset(req);
        return ResponseEntity.noContent().build();
    }
    @PostMapping("/password/reset")
    public ResponseEntity<Void> reset(@Valid @RequestBody ResetPasswordDto req) {
        resetService.resetPassword(req);
        return ResponseEntity.noContent().build();
    }

    private void setAuthCookies(HttpServletResponse res, AuthResponse tokens) {
        ResponseCookie access = ResponseCookie.from("accessToken", tokens.getAccessToken())
                .httpOnly(false)
                .secure(false)
                .sameSite("Lax")
                .path("/")
                .maxAge(Duration.ofMillis(900000))
                .build();
        ResponseCookie refresh = ResponseCookie.from("refreshToken", tokens.getRefreshToken())
                .httpOnly(true)
                .secure(false)
                .sameSite("Lax")
                .path("/api/auth")
                .maxAge(Duration.ofMillis(2592000000L))
                .build();

        res.addHeader(HttpHeaders.SET_COOKIE, access.toString());
        res.addHeader(HttpHeaders.SET_COOKIE, refresh.toString());
    }
    private void clearAuthCookies(HttpServletResponse res) {
        ResponseCookie access = ResponseCookie.from("accessToken", "").path("/").maxAge(0).build();
        ResponseCookie refresh = ResponseCookie.from("refreshToken", "").path("/api/auth").maxAge(0).build();
        res.addHeader(HttpHeaders.SET_COOKIE, access.toString());
        res.addHeader(HttpHeaders.SET_COOKIE, refresh.toString());
    }
}
</file>

<file path="controllers/BrandController.java">
package com.kosmetichka.backend.controllers;

import com.kosmetichka.backend.dtos.requests.create.BrandCreateDto;
import com.kosmetichka.backend.dtos.requests.update.BrandUpdateDto;
import com.kosmetichka.backend.dtos.responses.BrandResponse;
import com.kosmetichka.backend.services.BrandService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/brands")
@RequiredArgsConstructor
public class BrandController {
    private final BrandService service;

    @GetMapping
    public ResponseEntity<List<BrandResponse>> get() {
        return ResponseEntity.ok(service.get());
    }
    @GetMapping("/{id}")
    public ResponseEntity<BrandResponse> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(service.getById(id));
    }
    @PostMapping
    public ResponseEntity<BrandResponse> create(@Valid @RequestBody BrandCreateDto req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(req));
    }
    @PatchMapping("/{id}")
    public ResponseEntity<BrandResponse> update(@PathVariable UUID id, @Valid  @RequestBody BrandUpdateDto req) {
        return ResponseEntity.ok(service.update(id, req));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
</file>

<file path="controllers/CartController.java">
package com.kosmetichka.backend.controllers;

import com.kosmetichka.backend.dtos.requests.create.CartPositionCreateDto;
import com.kosmetichka.backend.dtos.requests.update.CartPositionUpdateDto;
import com.kosmetichka.backend.dtos.responses.CartResponse;
import com.kosmetichka.backend.security.UserPrincipal;
import com.kosmetichka.backend.services.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {
    private final CartService service;

    private UserPrincipal principal() {
        return (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
    @GetMapping
    public ResponseEntity<CartResponse> getCart() {
        return ResponseEntity.ok(service.getCart(principal()));
    }
    @PostMapping("/positions")
    public ResponseEntity<CartResponse> addPosition(@Valid  @RequestBody CartPositionCreateDto req) {
        return ResponseEntity.ok(service.addPosition(principal(), req));
    }
    @PatchMapping("/positions/{id}")
    public ResponseEntity<CartResponse> updatePosition(@PathVariable UUID id,
                                                       @Valid @RequestBody CartPositionUpdateDto req) {
        return ResponseEntity.ok(service.updatePosition(principal(), id, req));
    }
    @DeleteMapping("/positions/{id}")
    public ResponseEntity<CartResponse> deletePosition(@PathVariable UUID id) {
        return ResponseEntity.ok(service.deletePosition(principal(), id));
    }
    @DeleteMapping
    public ResponseEntity<Void> clearCart() {
        service.clearCart(principal());
        return ResponseEntity.noContent().build();
    }
}
</file>

<file path="controllers/CategoryController.java">
package com.kosmetichka.backend.controllers;

import com.kosmetichka.backend.dtos.requests.create.CategoryCreateDto;
import com.kosmetichka.backend.dtos.requests.update.CategoryUpdateDto;
import com.kosmetichka.backend.dtos.responses.CategoryResponse;
import com.kosmetichka.backend.services.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService service;

    @GetMapping
    public ResponseEntity<List<CategoryResponse>> get() {
        return ResponseEntity.ok(service.get());
    }
    @GetMapping("/{id}")
    public ResponseEntity<CategoryResponse> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(service.getById(id));
    }
    @PostMapping
    public ResponseEntity<CategoryResponse> create(@Valid @RequestBody CategoryCreateDto req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(req));
    }
    @PatchMapping("/{id}")
    public ResponseEntity<CategoryResponse> update(@PathVariable UUID id, @Valid @RequestBody CategoryUpdateDto req) {
        return ResponseEntity.ok(service.update(id, req));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }
}
</file>

<file path="controllers/ContentCardController.java">
package com.kosmetichka.backend.controllers;

import com.kosmetichka.backend.dtos.requests.create.ContentCardCreateDto;
import com.kosmetichka.backend.dtos.requests.update.ContentCardUpdateDto;
import com.kosmetichka.backend.dtos.responses.ContentCardResponse;
import com.kosmetichka.backend.models.enums.ContentType;
import com.kosmetichka.backend.services.ContentCardService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/content")
@RequiredArgsConstructor
public class ContentCardController {
    private final ContentCardService service;

    @GetMapping
    public ResponseEntity<List<ContentCardResponse>> get(@RequestParam(required = false) ContentType type) {
        if (type != null) return ResponseEntity.ok(service.getByType(type));
        return ResponseEntity.ok(service.get());
    }
    @GetMapping("/{id}")
    public ResponseEntity<ContentCardResponse> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(service.getById(id));
    }
    @PostMapping
    public ResponseEntity<ContentCardResponse> create(@Valid @RequestBody ContentCardCreateDto req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(req));
    }
    @PatchMapping("/{id}")
    public ResponseEntity<ContentCardResponse> update(@PathVariable UUID id, @Valid @RequestBody ContentCardUpdateDto req) {
        return ResponseEntity.ok(service.update(id, req));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
</file>

<file path="controllers/FileController.java">
package com.kosmetichka.backend.controllers;

import com.kosmetichka.backend.services.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/files")
@RequiredArgsConstructor
public class FileController {
    private final FileStorageService service;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Map<String, String>> upload(@RequestParam("file")MultipartFile file) {
        String url = service.upload(file);
        return ResponseEntity.ok(Map.of("url", url));
    }
}
</file>

<file path="controllers/ProductController.java">
package com.kosmetichka.backend.controllers;

import com.kosmetichka.backend.dtos.requests.create.ProductCreateDto;
import com.kosmetichka.backend.dtos.requests.filter.ProductFilterDto;
import com.kosmetichka.backend.dtos.requests.update.ProductUpdateDto;
import com.kosmetichka.backend.dtos.responses.PageResponse;
import com.kosmetichka.backend.dtos.responses.ProductResponse;
import com.kosmetichka.backend.services.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.SortDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService service;

    @GetMapping
    public ResponseEntity<PageResponse<ProductResponse>> getAll(
            @RequestParam(required = false)String search,
            @RequestParam(required = false)UUID categoryId,
            @RequestParam(required = false)UUID brandId,
            @RequestParam(required = false)BigDecimal minPrice,
            @RequestParam(required = false)BigDecimal maxPrice,
            @PageableDefault(size = 20) @SortDefault(sort = "name")Pageable pageable
    ) {
        ProductFilterDto f = ProductFilterDto.builder()
                .search(search)
                .categoryId(categoryId)
                .brandId(brandId)
                .minPrice(minPrice)
                .maxPrice(maxPrice)
                .build();
        return ResponseEntity.ok(service.get(f, pageable));
    }
    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(service.getById(id));
    }
    @PostMapping
    public ResponseEntity<ProductResponse> create(@Valid @RequestBody ProductCreateDto req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(req));
    }
    @PatchMapping("/{id}")
    public ResponseEntity<ProductResponse> update(@PathVariable UUID id, @Valid @RequestBody ProductUpdateDto req) {
        return ResponseEntity.ok(service.update(id, req));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
</file>

<file path="controllers/ShopController.java">
package com.kosmetichka.backend.controllers;

import com.kosmetichka.backend.dtos.requests.create.ShopCreateDto;
import com.kosmetichka.backend.dtos.requests.update.ShopUpdateDto;
import com.kosmetichka.backend.dtos.responses.ShopResponse;
import com.kosmetichka.backend.services.ShopService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/shops")
@RequiredArgsConstructor
public class ShopController {
    private final ShopService service;

    @GetMapping
    public ResponseEntity<List<ShopResponse>> get() {
        return ResponseEntity.ok(service.get());
    }
    @GetMapping("/{id}")
    public ResponseEntity<ShopResponse> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(service.getById(id));
    }
    @PostMapping
    public ResponseEntity<ShopResponse> create(@Valid @RequestBody ShopCreateDto req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(req));
    }
    @PatchMapping("/{id}")
    public ResponseEntity<ShopResponse> update(@PathVariable UUID id, @Valid @RequestBody ShopUpdateDto req) {
        return ResponseEntity.ok(service.update(id, req));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }
}
</file>

<file path="controllers/UserController.java">
package com.kosmetichka.backend.controllers;

import com.kosmetichka.backend.dtos.requests.update.PasswordUpdateDto;
import com.kosmetichka.backend.dtos.requests.update.UserUpdateDto;
import com.kosmetichka.backend.dtos.responses.StatisticsResponse;
import com.kosmetichka.backend.dtos.responses.UserResponse;
import com.kosmetichka.backend.security.UserPrincipal;
import com.kosmetichka.backend.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService service;

    private UserPrincipal principal() {
        return (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
    @GetMapping("/statistics")
    public ResponseEntity<List<StatisticsResponse>> getStatistics() {
        return ResponseEntity.ok(service.getStatistics());
    }
    @GetMapping("/me")
    public ResponseEntity<UserResponse> getMe() {
        return ResponseEntity.ok(service.getProfile(principal()));
    }
    @PatchMapping("/me")
    public ResponseEntity<UserResponse> updateMe(@Valid @RequestBody UserUpdateDto req) {
        return ResponseEntity.ok(service.updateProfile(principal(), req));
    }
    @PatchMapping("/me/password")
    public ResponseEntity<Void> changePassword(@Valid @RequestBody PasswordUpdateDto req) {
        service.changePassword(principal(), req);
        return ResponseEntity.noContent().build();
    }

    // Админка
    @GetMapping
    public ResponseEntity<List<UserResponse>> getAll() {
        return ResponseEntity.ok(service.get());
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
</file>

<file path="dtos/requests/create/AppealCreateDto.java">
package com.kosmetichka.backend.dtos.requests.create;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public abstract class AppealCreateDto {
    @NotBlank(message = "Текст обращения обязателен")
    private String content;
    @NotBlank(message = "Введите почту")
    @Email(message = "Некорректный формат email")
    private String contactEmail;
    @NotBlank(message = "Введите номер телефона")
    private String contactPhone;
}
</file>

<file path="dtos/requests/create/AttributeCreateDto.java">
package com.kosmetichka.backend.dtos.requests.create;

import com.kosmetichka.backend.models.enums.AttributeType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AttributeCreateDto {
    @NotBlank(message = "Введите название атрибута")
    private String name;
    @NotNull(message = "Выберите тип атрибута")
    private AttributeType type;
    private String unit;
    @NotNull(message = "Выберите категорию, для которой создаете атрибут")
    private UUID categoryId;
}
</file>

<file path="dtos/requests/create/AttributeValueCreateDto.java">
package com.kosmetichka.backend.dtos.requests.create;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AttributeValueCreateDto {
    @NotNull(message = "Выберите атрибут")
    private UUID attributeId;
    @NotBlank(message = "Введите значение атрибута")
    private String value;
}
</file>

<file path="dtos/requests/create/BrandCreateDto.java">
package com.kosmetichka.backend.dtos.requests.create;

import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.hibernate.validator.constraints.URL;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BrandCreateDto {
    @NotBlank(message = "Введите название бренда")
    private String name;
    private String description;
    @URL(message = "Некорректная ссылка на логотип")
    private String logoUrl;
}
</file>

<file path="dtos/requests/create/CartPositionCreateDto.java">
package com.kosmetichka.backend.dtos.requests.create;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CartPositionCreateDto {
    @NotNull(message = "Выберите товар")
    private UUID productId;
    @NotNull(message = "Введите количество товара")
    @Min(value = 1, message = "Количество товара должно быть больше нуля")
    private Integer quantity;
}
</file>

<file path="dtos/requests/create/CategoryCreateDto.java">
package com.kosmetichka.backend.dtos.requests.create;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CategoryCreateDto {
    @NotBlank(message = "Введите название категории")
    private String name;
}
</file>

<file path="dtos/requests/create/ClientQuestionCreateDto.java">
package com.kosmetichka.backend.dtos.requests.create;

import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class ClientQuestionCreateDto extends AppealCreateDto {
    @NotBlank(message = "Введите свое полное имя")
    private String fullName;
}
</file>

<file path="dtos/requests/create/ContentCardCreateDto.java">
package com.kosmetichka.backend.dtos.requests.create;

import com.kosmetichka.backend.models.enums.ContentType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.validator.constraints.URL;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ContentCardCreateDto {
    @NotBlank(message = "Введите заголовок")
    private String title;
    private String description;
    @NotNull(message = "Выберите тип контента")
    private ContentType type;
    @URL(message = "Некорректная ссылка на изображение")
    private String photoUrl;
}
</file>

<file path="dtos/requests/create/LoginDto.java">
package com.kosmetichka.backend.dtos.requests.create;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginDto {
    @NotBlank(message = "Введите почту")
    @Email(message = "Некорректный формат почты")
    private String email;
    @NotBlank(message = "Введите пароль")
    private String password;
}
</file>

<file path="dtos/requests/create/ProductCreateDto.java">
package com.kosmetichka.backend.dtos.requests.create;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductCreateDto {
    @NotBlank(message = "Введите название товара")
    private String name;
    private String barCodeNumber;
    private String article;
    private String description;
    @NotNull(message = "Введите количество товара")
    @Min(value = 0, message = "Количество товара не может быть отрицательным")
    private Integer quantity;
    @NotNull(message = "Введите цену товара")
    @DecimalMin(value = "0.0", inclusive = false, message = "Цена товара должна быть больше нуля")
    private BigDecimal price;
    @NotNull(message = "Выберите категорию товара")
    private UUID categoryId;
    @NotNull(message = "Выберите производителя товара")
    private UUID brandId;
    @Valid
    private List<AttributeValueCreateDto> attributeValues;
}
</file>

<file path="dtos/requests/create/RegisterDto.java">
package com.kosmetichka.backend.dtos.requests.create;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterDto {
    @NotBlank(message = "Введите свое имя")
    private String name;
    @NotBlank(message = "Введите свою почту")
    @Email(message = "Некорректный формат почты")
    private String email;
    @NotBlank(message = "Введите свой номер телефона")
    private String phone;
    @NotBlank(message = "Введите пароль")
    @Size(min = 8, message = "Пароль должен быть длиной не менее 8 символов")
    private String password;
}
</file>

<file path="dtos/requests/create/ShopContactCreateDto.java">
package com.kosmetichka.backend.dtos.requests.create;

import com.kosmetichka.backend.models.enums.ContactType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ShopContactCreateDto {
    @NotBlank(message = "Введите подпись для контакта")
    private String label;
    @NotNull(message = "Выберите тип контакта")
    private ContactType type;
    @NotBlank(message = "Введите значение контакта")
    private String value;
}
</file>

<file path="dtos/requests/create/ShopCreateDto.java">
package com.kosmetichka.backend.dtos.requests.create;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ShopCreateDto {
    @NotBlank(message = "Введите название магазина")
    private String name;
    private String description;
    @NotBlank(message = "Введите адрес магазина")
    private String address;
    @Valid
    private List<ShopContactCreateDto> contacts;
}
</file>

<file path="dtos/requests/create/SupplierRequestCreateDto.java">
package com.kosmetichka.backend.dtos.requests.create;

import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class SupplierRequestCreateDto extends AppealCreateDto {
    @NotBlank(message = "Введите название компании")
    private String companyName;
}
</file>

<file path="dtos/requests/filter/ProductFilterDto.java">
package com.kosmetichka.backend.dtos.requests.filter;

import lombok.*;

import java.math.BigDecimal;
import java.util.Map;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductFilterDto {
    private String search; // по имени или артикулу
    private UUID categoryId;
    private UUID brandId;
    private BigDecimal minPrice;
    private BigDecimal maxPrice;
    private Map<UUID, String> attributes;
}
</file>

<file path="dtos/requests/filter/ProductSpecification.java">
package com.kosmetichka.backend.dtos.requests.filter;

import com.kosmetichka.backend.models.api.AttributeValue;
import com.kosmetichka.backend.models.api.Product;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import jakarta.persistence.criteria.Subquery;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

public class ProductSpecification {
    public static Specification<Product> withFilter(ProductFilterDto f) {
        return (r, q, cb) -> {
            List<Predicate> preds = new ArrayList<>();
            if (f.getSearch() != null && !f.getSearch().isBlank()) {
                String pattern = "%" + f.getSearch().toLowerCase() + "%";
                preds.add(cb.or(
                        cb.like(cb.lower(r.get("name")), pattern),
                        cb.like(cb.lower(r.get("article")), pattern)
                ));
            }
            if (f.getCategoryId() != null) {
                preds.add(cb.equal(r.get("category").get("id"), f.getCategoryId()));
            }
            if (f.getBrandId() != null) {
                preds.add(cb.equal(r.get("brand").get("id"), f.getBrandId()));
            }
            if (f.getMinPrice() != null) {
                preds.add(cb.greaterThanOrEqualTo(r.get("price"), f.getMinPrice()));
            }
            if (f.getMaxPrice() != null) {
                preds.add(cb.lessThanOrEqualTo(r.get("price"), f.getMaxPrice()));
            }
            if (f.getAttributes() != null && !f.getAttributes().isEmpty()) {
                for (Map.Entry<UUID, String> entry: f.getAttributes().entrySet()) {
                    Subquery<UUID> sq = q.subquery(UUID.class);
                    Root<AttributeValue> avRoot = sq.from(AttributeValue.class);
                    sq.select(avRoot.get("product").get("id"))
                            .where(
                                    cb.equal(avRoot.get("attribute").get("id"), entry.getKey()),
                                    cb.equal(avRoot.get("value"), entry.getValue())
                            );
                    preds.add(cb.in(r.get("id")).value(sq));
                }
            }
            return cb.and(preds.toArray(new Predicate[0]));
        };
    }
}
</file>

<file path="dtos/requests/reset_password/ForgotPasswordDto.java">
package com.kosmetichka.backend.dtos.requests.reset_password;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ForgotPasswordDto {
    @NotBlank(message = "Введите email")
    @Email(message = "Некорректный формат почты")
    private String email;
}
</file>

<file path="dtos/requests/reset_password/ResetPasswordDto.java">
package com.kosmetichka.backend.dtos.requests.reset_password;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResetPasswordDto {
    @NotBlank(message = "Введите токен")
    private String token;
    @NotBlank(message = "Введите новый пароль")
    @Size(min = 8, message = "Пароль должен быть длиной хотя бы 8 символов")
    private String newPassword;
}
</file>

<file path="dtos/requests/update/AppealUpdateDto.java">
package com.kosmetichka.backend.dtos.requests.update;

import com.kosmetichka.backend.models.enums.AppealStatus;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AppealUpdateDto {
    @NotNull(message = "Выберите статус обращения")
    private AppealStatus status;
}
</file>

<file path="dtos/requests/update/AttributeUpdateDto.java">
package com.kosmetichka.backend.dtos.requests.update;

import com.kosmetichka.backend.models.enums.AttributeType;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AttributeUpdateDto {
    private String name;
    private AttributeType type;
    private String unit;
}
</file>

<file path="dtos/requests/update/AttributeValueUpdateDto.java">
package com.kosmetichka.backend.dtos.requests.update;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AttributeValueUpdateDto {
    private String value;
}
</file>

<file path="dtos/requests/update/BrandUpdateDto.java">
package com.kosmetichka.backend.dtos.requests.update;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BrandUpdateDto {
    private String name;
    private String description;
    private String logoUrl;
}
</file>

<file path="dtos/requests/update/CartPositionUpdateDto.java">
package com.kosmetichka.backend.dtos.requests.update;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CartPositionUpdateDto {
    @NotNull(message = "Введите количество товара")
    @Min(value = 1, message = "Количество товара должно быть больше нуля")
    private Integer quantity;
}
</file>

<file path="dtos/requests/update/CategoryUpdateDto.java">
package com.kosmetichka.backend.dtos.requests.update;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CategoryUpdateDto {
    private String name;
}
</file>

<file path="dtos/requests/update/ContentCardUpdateDto.java">
package com.kosmetichka.backend.dtos.requests.update;

import com.kosmetichka.backend.models.enums.ContentType;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ContentCardUpdateDto {
    private String title;
    private String description;
    private ContentType type;
    private String photoUrl;
}
</file>

<file path="dtos/requests/update/PasswordUpdateDto.java">
package com.kosmetichka.backend.dtos.requests.update;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PasswordUpdateDto {
    @NotBlank(message = "Введите свой текущий пароль")
    private String oldPassword;
    @NotBlank(message = "Введите новый пароль")
    @Size(min = 8, message = "Пароль должен быть длиной хотя бы 8 символов")
    private String newPassword;
}
</file>

<file path="dtos/requests/update/ProductUpdateDto.java">
package com.kosmetichka.backend.dtos.requests.update;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import lombok.*;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductUpdateDto {
    private String name;
    private String barCodeNumber;
    private String article;
    private String description;
    @Min(value = 0, message = "Количество товара должно быть больше нуля")
    private Integer quantity;
    @DecimalMin(value = "0.0", inclusive = false, message = "Цена товара должна быть больше нуля")
    private BigDecimal price;
    private UUID categoryId;
    private UUID brandId;
}
</file>

<file path="dtos/requests/update/ShopUpdateDto.java">
package com.kosmetichka.backend.dtos.requests.update;

import com.kosmetichka.backend.dtos.requests.create.ShopContactCreateDto;
import jakarta.validation.Valid;
import lombok.*;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ShopUpdateDto {
    private String name;
    private String description;
    private String address;
    @Valid
    private List<ShopContactCreateDto> contacts;
}
</file>

<file path="dtos/requests/update/UserUpdateDto.java">
package com.kosmetichka.backend.dtos.requests.update;

import jakarta.validation.constraints.Email;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserUpdateDto {
    private String name;
    @Email(message = "Некорректный формат почты")
    private String email;
    private String phone;
}
</file>

<file path="dtos/responses/AppealResponse.java">
package com.kosmetichka.backend.dtos.responses;

import com.kosmetichka.backend.models.enums.AppealStatus;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.UUID;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class AppealResponse {
    private UUID id;
    private String content;
    private AppealStatus status;
    private String contactEmail;
    private String contactPhone;
    private String appealType;
    private UserResponse user;
}
</file>

<file path="dtos/responses/AttributeResponse.java">
package com.kosmetichka.backend.dtos.responses;

import com.kosmetichka.backend.models.enums.AttributeType;
import lombok.*;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AttributeResponse {
    private UUID id;
    private String name;
    private AttributeType type;
    private String unit;
}
</file>

<file path="dtos/responses/AttributeValueResponse.java">
package com.kosmetichka.backend.dtos.responses;

import lombok.*;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AttributeValueResponse {
    private UUID id;
    private String value;
    private AttributeResponse attribute;
}
</file>

<file path="dtos/responses/AuthResponse.java">
package com.kosmetichka.backend.dtos.responses;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
    private String accessToken;
    private String refreshToken;
}
</file>

<file path="dtos/responses/BrandResponse.java">
package com.kosmetichka.backend.dtos.responses;

import java.util.UUID;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BrandResponse {
    private UUID id;
    private String name;
    private String description;
    private String logoUrl;
}
</file>

<file path="dtos/responses/CartPositionResponse.java">
package com.kosmetichka.backend.dtos.responses;

import lombok.*;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CartPositionResponse {
    private UUID id;
    private Integer quantity;
    private BigDecimal price;
    private ProductResponse product;
}
</file>

<file path="dtos/responses/CartResponse.java">
package com.kosmetichka.backend.dtos.responses;

import lombok.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CartResponse {
    private UUID id;
    private List<CartPositionResponse> positions;
    private BigDecimal total;
}
</file>

<file path="dtos/responses/CategoryResponse.java">
package com.kosmetichka.backend.dtos.responses;

import java.util.List;
import java.util.UUID;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CategoryResponse {
    private UUID id;
    private String name;
    private List<AttributeResponse> attributes;
}
</file>

<file path="dtos/responses/ClientQuestionResponse.java">
package com.kosmetichka.backend.dtos.responses;

import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class ClientQuestionResponse extends AppealResponse {
    private String fullName;
}
</file>

<file path="dtos/responses/ContentCardResponse.java">
package com.kosmetichka.backend.dtos.responses;

import com.kosmetichka.backend.models.enums.ContentType;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ContentCardResponse {
    private UUID id;
    private String title;
    private String description;
    private ContentType type;
    private String photoUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
</file>

<file path="dtos/responses/PageResponse.java">
package com.kosmetichka.backend.dtos.responses;

import lombok.*;
import org.springframework.data.domain.Page;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PageResponse<T> {
    private List<T> content;
    private int page;
    private int size;
    private long totalElements;
    private int totalPages;
    private boolean last;

    public static <T> PageResponse<T> from(Page<T> page) {
        return PageResponse.<T>builder()
                .content(page.getContent())
                .page(page.getNumber())
                .size(page.getSize())
                .totalElements(page.getTotalElements())
                .totalPages(page.getTotalPages())
                .last(page.isLast())
                .build();
    }
}
</file>

<file path="dtos/responses/ProductResponse.java">
package com.kosmetichka.backend.dtos.responses;

import lombok.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductResponse {
    private UUID id;
    private String name;
    private String barCodeNumber;
    private String article;
    private String description;
    private Integer quantity;
    private BigDecimal price;
    private CategoryResponse category;
    private BrandResponse brand;
    private List<AttributeValueResponse> attributeValues;
}
</file>

<file path="dtos/responses/ShopContactResponse.java">
package com.kosmetichka.backend.dtos.responses;

import com.kosmetichka.backend.models.enums.ContactType;
import lombok.*;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ShopContactResponse {
    private UUID id;
    private String label;
    private ContactType type;
    private String value;
}
</file>

<file path="dtos/responses/ShopResponse.java">
package com.kosmetichka.backend.dtos.responses;

import lombok.*;

import java.util.List;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ShopResponse {
    private UUID id;
    private String name;
    private String description;
    private String address;
    private List<ShopContactResponse> contacts;
}
</file>

<file path="dtos/responses/StatisticsResponse.java">
package com.kosmetichka.backend.dtos.responses;

import lombok.*;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StatisticsResponse {
    private LocalDate date;
    private long count;
}
</file>

<file path="dtos/responses/SupplierRequestResponse.java">
package com.kosmetichka.backend.dtos.responses;

import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class SupplierRequestResponse extends AppealResponse {
    private String companyName;
}
</file>

<file path="dtos/responses/UserResponse.java">
package com.kosmetichka.backend.dtos.responses;

import com.kosmetichka.backend.models.enums.UserRole;

import java.time.LocalDateTime;
import java.util.UUID;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
    private UUID id;
    private String name;
    private String email;
    private String phone;
    private UserRole role;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
</file>

<file path="models/api/Appeal.java">
package com.kosmetichka.backend.models.api;

import com.kosmetichka.backend.models.enums.AppealStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.UUID;

@SuperBuilder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "appeals")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "appeal_type")
public class Appeal {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;
    @Enumerated(EnumType.STRING)
    private AppealStatus status;
    @Column(nullable = false)
    private String contactEmail;
    @Column(nullable = false)
    private String contactPhone;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
</file>

<file path="models/api/Attribute.java">
package com.kosmetichka.backend.models.api;

import com.kosmetichka.backend.models.enums.AttributeType;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "attributes")
public class Attribute {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(nullable = false)
    private String name;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AttributeType type;
    private String unit;
    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;
}
</file>

<file path="models/api/AttributeValue.java">
package com.kosmetichka.backend.models.api;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "attribute_values")
public class AttributeValue {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(nullable = false)
    private String value;
    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
    @ManyToOne
    @JoinColumn(name = "attribute_id", nullable = false)
    private Attribute attribute;
}
</file>

<file path="models/api/Brand.java">
package com.kosmetichka.backend.models.api;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "brands")
public class Brand {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(nullable = false)
    private String name;
    private String description;
    private String logoUrl;
}
</file>

<file path="models/api/Cart.java">
package com.kosmetichka.backend.models.api;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "carts")
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;
    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<CartPosition> positions = new ArrayList<>();
}
</file>

<file path="models/api/CartPosition.java">
package com.kosmetichka.backend.models.api;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.UUID;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "cart_positions")
public class CartPosition {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(nullable = false)
    private Integer quantity;
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;
    @ManyToOne
    @JoinColumn(name = "cart_id", nullable = false)
    private Cart cart;
    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
}
</file>

<file path="models/api/Category.java">
package com.kosmetichka.backend.models.api;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Builder
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(nullable = false)
    private String name;
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Attribute> attributes = new ArrayList<>();
}
</file>

<file path="models/api/ClientQuestion.java">
package com.kosmetichka.backend.models.api;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@DiscriminatorValue("CLIENT_QUESTION")
public class ClientQuestion extends Appeal {
    @Column(nullable = false)
    private String fullName;
}
</file>

<file path="models/api/ContentCard.java">
package com.kosmetichka.backend.models.api;

import com.kosmetichka.backend.models.enums.ContentType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "content_cards")
public class ContentCard {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(nullable = false)
    private String title;
    private String description;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ContentType type;
    private String photoUrl;
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        LocalDateTime x = LocalDateTime.now();
        createdAt = x;
        updatedAt = x;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
</file>

<file path="models/api/PasswordResetToken.java">
package com.kosmetichka.backend.models.api;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "password_reset_tokens")
public class PasswordResetToken {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(nullable = false, unique = true)
    private String token;
    @Column(nullable = false)
    private LocalDateTime expiresAt;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
</file>

<file path="models/api/Product.java">
package com.kosmetichka.backend.models.api;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(nullable = false)
    private String name;
    @Column(name = "bar_code_number", unique = true)
    private String barCodeNumber;
    @Column(unique = true)
    private String article;
    @Column(columnDefinition = "TEXT")
    private String description;
    @Column(nullable = false)
    private Integer quantity;
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;
    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;
    @ManyToOne
    @JoinColumn(name = "brand_id", nullable = false)
    private Brand brand;
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<AttributeValue> attributeValues = new ArrayList<>();
}
</file>

<file path="models/api/Shop.java">
package com.kosmetichka.backend.models.api;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "shops")
public class Shop {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(nullable = false)
    private String name;
    private String description;
    @Column(nullable = false)
    private String address;
    @OneToMany(mappedBy = "shop", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<ShopContact> contacts = new ArrayList<>();
}
</file>

<file path="models/api/ShopContact.java">
package com.kosmetichka.backend.models.api;

import com.kosmetichka.backend.models.enums.ContactType;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "shop_contacts")
public class ShopContact {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(nullable = false)
    private String label;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ContactType type;
    @Column(nullable = false)
    private String value;
    @ManyToOne
    @JoinColumn(name = "shop_id", nullable = false)
    private Shop shop;
}
</file>

<file path="models/api/SupplierRequest.java">
package com.kosmetichka.backend.models.api;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@DiscriminatorValue("SUPPLIER_REQUEST")
public class SupplierRequest extends Appeal {
    @Column(nullable = false)
    private String companyName;
}
</file>

<file path="models/api/User.java">
package com.kosmetichka.backend.models.api;

import com.kosmetichka.backend.models.enums.UserRole;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false, unique = true)
    private String email;
    @Column(nullable = false)
    private String password;
    private String phone;
    @Enumerated(EnumType.STRING)
    private UserRole role;
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        LocalDateTime x = LocalDateTime.now();
        createdAt = x;
        updatedAt = x;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
</file>

<file path="models/enums/AppealStatus.java">
package com.kosmetichka.backend.models.enums;

public enum AppealStatus {
    IN_PROCESS,
    ACCEPTED,
    REJECTED,
    NEW
}
</file>

<file path="models/enums/AttributeType.java">
package com.kosmetichka.backend.models.enums;

public enum AttributeType {
    INT, FLOAT, TEXT, ENUM
}
</file>

<file path="models/enums/ContactType.java">
package com.kosmetichka.backend.models.enums;

public enum ContactType {
    PHONE, EMAIL, SOCIAL_MEDIA
}
</file>

<file path="models/enums/ContentType.java">
package com.kosmetichka.backend.models.enums;

public enum ContentType {
    NEWS,
    PROMO
}
</file>

<file path="models/enums/UserRole.java">
package com.kosmetichka.backend.models.enums;

public enum UserRole {
    ADMIN,
    CREATOR,
    CLIENT,
    SUPPLIER
}
</file>

<file path="repos/AppealRepo.java">
package com.kosmetichka.backend.repos;

import com.kosmetichka.backend.models.api.Appeal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AppealRepo extends JpaRepository<Appeal, UUID> {}
</file>

<file path="repos/AttributeRepo.java">
package com.kosmetichka.backend.repos;

import com.kosmetichka.backend.models.api.Attribute;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface AttributeRepo extends JpaRepository<Attribute, UUID> {
    List<Attribute> findByCategoryId(UUID categoryId);
}
</file>

<file path="repos/AttributeValueRepo.java">
package com.kosmetichka.backend.repos;

import com.kosmetichka.backend.models.api.AttributeValue;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AttributeValueRepo extends JpaRepository<AttributeValue, UUID> {
}
</file>

<file path="repos/BrandRepo.java">
package com.kosmetichka.backend.repos;

import com.kosmetichka.backend.models.api.Brand;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface BrandRepo extends JpaRepository<Brand, UUID> {
}
</file>

<file path="repos/CartPositionRepo.java">
package com.kosmetichka.backend.repos;

import com.kosmetichka.backend.models.api.CartPosition;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CartPositionRepo extends JpaRepository<CartPosition, UUID> {
}
</file>

<file path="repos/CartRepo.java">
package com.kosmetichka.backend.repos;

import com.kosmetichka.backend.models.api.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface CartRepo extends JpaRepository<Cart, UUID> {
    Optional<Cart> findByUserId(UUID id);
}
</file>

<file path="repos/CategoryRepo.java">
package com.kosmetichka.backend.repos;

import com.kosmetichka.backend.models.api.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CategoryRepo extends JpaRepository<Category, UUID> {
}
</file>

<file path="repos/ClientQuestionRepo.java">
package com.kosmetichka.backend.repos;

import com.kosmetichka.backend.models.api.ClientQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ClientQuestionRepo extends JpaRepository<ClientQuestion, UUID> {
}
</file>

<file path="repos/ContentCardRepo.java">
package com.kosmetichka.backend.repos;

import com.kosmetichka.backend.models.api.ContentCard;
import com.kosmetichka.backend.models.enums.ContentType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ContentCardRepo extends JpaRepository<ContentCard, UUID> {
    List<ContentCard> findByType(ContentType type);
}
</file>

<file path="repos/PasswordResetTokenRepo.java">
package com.kosmetichka.backend.repos;

import com.kosmetichka.backend.models.api.PasswordResetToken;
import com.kosmetichka.backend.models.api.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface PasswordResetTokenRepo extends JpaRepository<PasswordResetToken, UUID> {
    Optional<PasswordResetToken> findByToken(String token);
    void deleteByUser(User u);
}
</file>

<file path="repos/ProductRepo.java">
package com.kosmetichka.backend.repos;

import com.kosmetichka.backend.models.api.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.UUID;

public interface ProductRepo extends JpaRepository<Product, UUID>, JpaSpecificationExecutor<Product> {
}
</file>

<file path="repos/ShopContactRepo.java">
package com.kosmetichka.backend.repos;

import com.kosmetichka.backend.models.api.ShopContact;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ShopContactRepo extends JpaRepository<ShopContact, UUID> {
}
</file>

<file path="repos/ShopRepo.java">
package com.kosmetichka.backend.repos;

import com.kosmetichka.backend.models.api.Shop;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ShopRepo extends JpaRepository<Shop, UUID> {
}
</file>

<file path="repos/SupplierRequestRepo.java">
package com.kosmetichka.backend.repos;

import com.kosmetichka.backend.models.api.SupplierRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface SupplierRequestRepo extends JpaRepository<SupplierRequest, UUID> {
}
</file>

<file path="repos/UserRepo.java">
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
</file>

<file path="security/JwtFilter.java">
package com.kosmetichka.backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {
    private final JwtService service;
    private final UserDetailsService detailsService;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String header = request.getHeader("Authorization");
        if (header == null || !header.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = header.substring(7);
        if (service.isTokenValid(token)) {
            String email = service.extractEmail(token);
            UserDetails userDetails = detailsService.loadUserByUsername(email);
            UsernamePasswordAuthenticationToken auth =
                    new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
            auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(auth);
        }
        filterChain.doFilter(request, response);
    }
}
</file>

<file path="security/JwtService.java">
package com.kosmetichka.backend.security;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
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
    private String buildToken(String subject, long expiration) {
        return Jwts.builder()
                .subject(subject)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getKey())
                .compact();
    }

    public String generateAccessToken(UserPrincipal pr) {
        return buildToken(pr.getUsername(), accessExpiration);
    }
    public String generateRefreshToken(UserPrincipal pr) {
        return buildToken(pr.getUsername(), refreshExpiration);
    }
    public String extractEmail(String token) {
        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
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
</file>

<file path="security/UserPrincipal.java">
package com.kosmetichka.backend.security;

import com.kosmetichka.backend.models.api.User;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
public class UserPrincipal implements UserDetails {
    private final User user;

    public UUID getId() {
        return user.getId();
    }
    public User getUser() {
        return user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()));
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }
    @Override
    public String getUsername() {
        return user.getEmail();
    }
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
    @Override
    public boolean isEnabled() {
        return true;
    }
}
</file>

<file path="services/AppealService.java">
package com.kosmetichka.backend.services;

import com.kosmetichka.backend.dtos.requests.create.ClientQuestionCreateDto;
import com.kosmetichka.backend.dtos.requests.create.SupplierRequestCreateDto;
import com.kosmetichka.backend.dtos.requests.update.AppealUpdateDto;
import com.kosmetichka.backend.dtos.responses.AppealResponse;
import com.kosmetichka.backend.models.api.Appeal;
import com.kosmetichka.backend.models.api.ClientQuestion;
import com.kosmetichka.backend.models.api.SupplierRequest;
import com.kosmetichka.backend.models.enums.AppealStatus;
import com.kosmetichka.backend.repos.AppealRepo;
import com.kosmetichka.backend.repos.ClientQuestionRepo;
import com.kosmetichka.backend.repos.SupplierRequestRepo;
import com.kosmetichka.backend.utilities.exceptions.BadRequestException;
import com.kosmetichka.backend.utilities.exceptions.NotFoundException;
import com.kosmetichka.backend.utilities.mappers.AppealMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AppealService {
    private final ClientQuestionRepo questionRepo;
    private final SupplierRequestRepo supplierRepo;
    private final AppealRepo repo;
    private final AppealMapper mapper;

    public List<AppealResponse> get() {
        return repo.findAll().stream().map(a -> {
            if (a instanceof ClientQuestion q)
                return mapper.toResponse(q);
            if (a instanceof SupplierRequest r)
                return mapper.toResponse(r);
            throw new BadRequestException("Неизвестный тип обращения");
        }).toList();
    }
    public AppealResponse createQuestion(ClientQuestionCreateDto req) {
        ClientQuestion q = mapper.toEntity(req);
        q.setStatus(AppealStatus.NEW);
        return mapper.toResponse(questionRepo.save(q));
    }
    public AppealResponse createSupplierRequest(SupplierRequestCreateDto req) {
        SupplierRequest r = mapper.toEntity(req);
        r.setStatus(AppealStatus.NEW);
        return mapper.toResponse(supplierRepo.save(r));
    }
    public AppealResponse updateStatus(UUID id, AppealUpdateDto req) {
        Appeal a = repo.findById(id)
                .orElseThrow(() -> new NotFoundException("Обращение не найдено"));
        mapper.updateEntity(req, a);
        a = repo.save(a);
        if (a instanceof ClientQuestion q)
            return mapper.toResponse(q);
        if (a instanceof SupplierRequest r)
            return mapper.toResponse(r);
        throw new BadRequestException("Неизвестный тип обращения");
    }
}
</file>

<file path="services/AttributeService.java">
package com.kosmetichka.backend.services;

import com.kosmetichka.backend.dtos.requests.create.AttributeCreateDto;
import com.kosmetichka.backend.dtos.requests.update.AttributeUpdateDto;
import com.kosmetichka.backend.dtos.responses.AttributeResponse;
import com.kosmetichka.backend.models.api.Attribute;
import com.kosmetichka.backend.models.api.Category;
import com.kosmetichka.backend.repos.AttributeRepo;
import com.kosmetichka.backend.repos.CategoryRepo;
import com.kosmetichka.backend.utilities.exceptions.NotFoundException;
import com.kosmetichka.backend.utilities.mappers.AttributeMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AttributeService {
    private final AttributeRepo repo;
    private final CategoryRepo cRepo;
    private final AttributeMapper mapper;

    public List<AttributeResponse> getByCategory(UUID id) {
        return repo.findByCategoryId(id).stream().map(mapper::toResponse).toList();
    }
    public AttributeResponse create(AttributeCreateDto req) {
        Attribute a = mapper.toEntity(req);
        Category c = cRepo.findById(req.getCategoryId())
                .orElseThrow(() -> new NotFoundException("Категория не найдена"));
        a.setCategory(c);
        return mapper.toResponse(repo.save(a));
    }
    public AttributeResponse update(UUID id, AttributeUpdateDto req) {
        Attribute a = repo.findById(id)
                .orElseThrow(() -> new NotFoundException("Атрибут не найден"));
        mapper.updateEntity(req, a);
        return mapper.toResponse(repo.save(a));
    }
    public void delete(UUID id) {
        if (!repo.existsById(id))
            throw new NotFoundException("Атрибут не найден");
        repo.deleteById(id);
    }
}
</file>

<file path="services/AuthService.java">
package com.kosmetichka.backend.services;

import com.kosmetichka.backend.dtos.requests.create.LoginDto;
import com.kosmetichka.backend.dtos.requests.create.RegisterDto;
import com.kosmetichka.backend.dtos.responses.AuthResponse;
import com.kosmetichka.backend.models.api.Cart;
import com.kosmetichka.backend.models.api.User;
import com.kosmetichka.backend.models.enums.UserRole;
import com.kosmetichka.backend.repos.CartRepo;
import com.kosmetichka.backend.repos.UserRepo;
import com.kosmetichka.backend.security.JwtService;
import com.kosmetichka.backend.security.UserPrincipal;
import com.kosmetichka.backend.utilities.exceptions.BadRequestException;
import com.kosmetichka.backend.utilities.mappers.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final CartRepo cRepo;
    private final UserRepo repo;
    private final UserMapper mapper;
    private final PasswordEncoder encoder;
    private final JwtService service;
    private final AuthenticationManager authManager;

    public AuthResponse register(RegisterDto req) {
        if (repo.findByEmail(req.getEmail()).isPresent())
            throw new BadRequestException("Пользователь с таким email уже существует");

        User u = mapper.toEntity(req);
        u.setPassword(encoder.encode(req.getPassword()));
        u.setRole(UserRole.CLIENT);
        repo.save(u);
        cRepo.save(Cart.builder().user(u).build());

        UserPrincipal pr = new UserPrincipal(u);
        return AuthResponse.builder()
                .accessToken(service.generateAccessToken(pr))
                .refreshToken(service.generateRefreshToken(pr))
                .build();
    }
    public AuthResponse login(LoginDto req) {
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword())
        );
        User u = repo.findByEmail(req.getEmail()).orElseThrow();
        UserPrincipal pr = new UserPrincipal(u);
        return AuthResponse.builder()
                .accessToken(service.generateAccessToken(pr))
                .refreshToken(service.generateRefreshToken(pr))
                .build();
    }
    public AuthResponse refresh(String refreshToken) {
        if (!service.isTokenValid(refreshToken))
            throw new BadRequestException("Некорректный refresh-токен");

        String email = service.extractEmail(refreshToken);
        User u = repo.findByEmail(email).orElseThrow();
        UserPrincipal pr = new UserPrincipal(u);
        return AuthResponse.builder()
                .accessToken(service.generateAccessToken(pr))
                .refreshToken(service.generateRefreshToken(pr))
                .build();
    }
}
</file>

<file path="services/BrandService.java">
package com.kosmetichka.backend.services;

import com.kosmetichka.backend.dtos.requests.create.BrandCreateDto;
import com.kosmetichka.backend.dtos.requests.update.BrandUpdateDto;
import com.kosmetichka.backend.dtos.responses.BrandResponse;
import com.kosmetichka.backend.models.api.Brand;
import com.kosmetichka.backend.repos.BrandRepo;
import com.kosmetichka.backend.utilities.exceptions.NotFoundException;
import com.kosmetichka.backend.utilities.mappers.BrandMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BrandService {
    private final BrandRepo repo;
    private final BrandMapper mapper;

    public List<BrandResponse> get() {
        return repo.findAll().stream().map(mapper::toResponse).toList();
    }
    public BrandResponse getById(UUID id) {
        return mapper.toResponse(repo.findById(id)
                .orElseThrow(() -> new NotFoundException("Производитель не найден")));
    }
    public BrandResponse create(BrandCreateDto req) {
        return mapper.toResponse(repo.save(mapper.toEntity(req)));
    }
    public BrandResponse update(UUID id, BrandUpdateDto req) {
        Brand b = repo.findById(id)
                .orElseThrow(() -> new NotFoundException("Производитель не найден"));
        mapper.updateEntity(req, b);
        return mapper.toResponse(repo.save(b));
    }
    public void delete(UUID id) {
        if (!repo.existsById(id))
            throw new NotFoundException("Производитель не найден");
        repo.deleteById(id);
    }
}
</file>

<file path="services/CartService.java">
package com.kosmetichka.backend.services;

import com.kosmetichka.backend.dtos.requests.create.CartPositionCreateDto;
import com.kosmetichka.backend.dtos.requests.update.CartPositionUpdateDto;
import com.kosmetichka.backend.dtos.responses.CartResponse;
import com.kosmetichka.backend.models.api.Cart;
import com.kosmetichka.backend.models.api.CartPosition;
import com.kosmetichka.backend.models.api.Product;
import com.kosmetichka.backend.repos.CartPositionRepo;
import com.kosmetichka.backend.repos.CartRepo;
import com.kosmetichka.backend.repos.ProductRepo;
import com.kosmetichka.backend.security.UserPrincipal;
import com.kosmetichka.backend.utilities.exceptions.ForbiddenException;
import com.kosmetichka.backend.utilities.exceptions.NotFoundException;
import com.kosmetichka.backend.utilities.mappers.CartMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CartService {
    private final CartRepo repo;
    private final CartPositionRepo posRepo;
    private final ProductRepo pRepo;
    private final CartMapper mapper;

    public CartResponse getCart(UserPrincipal p) {
        Cart c = repo.findByUserId(p.getId())
                .orElseThrow(() -> new NotFoundException("Корзина не найдена"));
        return mapper.toResponse(c);
    }
    public CartResponse addPosition(UserPrincipal pr, CartPositionCreateDto req) {
        Cart c = repo.findByUserId(pr.getId())
                .orElseThrow(() -> new NotFoundException("Корзина не найдена"));
        Product p = pRepo.findById(req.getProductId())
                .orElseThrow(() -> new NotFoundException("Товар не найден"));

        c.getPositions().stream()
                .filter(x -> x.getProduct().getId().equals(p.getId()))
                .findFirst()
                .ifPresentOrElse(
                        existing -> existing.setQuantity(existing.getQuantity() + req.getQuantity()),
                        () -> c.getPositions().add(CartPosition.builder()
                                        .cart(c)
                                        .product(p)
                                        .quantity(req.getQuantity())
                                        .price(p.getPrice())
                                .build())
                );
        return mapper.toResponse(repo.save(c));
    }
    public CartResponse updatePosition(UserPrincipal pr, UUID posId, CartPositionUpdateDto req) {
        CartPosition p = posRepo.findById(posId)
                .orElseThrow(() -> new NotFoundException("Позиция корзины не найдена"));
        if (!p.getCart().getUser().getId().equals(pr.getId()))
            throw new ForbiddenException("У вас нет прав на обновление позиции в корзине");
        p.setQuantity(req.getQuantity());
        posRepo.save(p);
        return getCart(pr);
    }
    public CartResponse deletePosition(UserPrincipal pr, UUID posId) {
        CartPosition p = posRepo.findById(posId)
                .orElseThrow(() -> new NotFoundException("Позиция корзины не найдена"));
        if (!p.getCart().getUser().getId().equals(pr.getId()))
            throw new ForbiddenException("У вас нет прав на удаление товара из корзины");
        posRepo.delete(p);
        return getCart(pr);
    }
    public void clearCart(UserPrincipal pr) {
        Cart c = repo.findByUserId(pr.getId())
                .orElseThrow(() -> new NotFoundException("Корзина не найдена"));
        c.getPositions().clear();
        repo.save(c);
    }
}
</file>

<file path="services/CategoryService.java">
package com.kosmetichka.backend.services;

import com.kosmetichka.backend.dtos.requests.create.CategoryCreateDto;
import com.kosmetichka.backend.dtos.requests.update.CategoryUpdateDto;
import com.kosmetichka.backend.dtos.responses.CategoryResponse;
import com.kosmetichka.backend.models.api.Category;
import com.kosmetichka.backend.repos.CategoryRepo;
import com.kosmetichka.backend.utilities.exceptions.NotFoundException;
import com.kosmetichka.backend.utilities.mappers.CategoryMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepo repo;
    private final CategoryMapper mapper;

    public List<CategoryResponse> get() {
        return repo.findAll().stream().map(mapper::toResponse).toList();
    }
    public CategoryResponse getById(UUID id) {
        return mapper.toResponse(repo.findById(id)
                .orElseThrow(() -> new NotFoundException("Категория не найдена")));
    }
    public CategoryResponse create(CategoryCreateDto req) {
        return mapper.toResponse(repo.save(mapper.toEntity(req)));
    }
    public CategoryResponse update(UUID id, CategoryUpdateDto req) {
        Category c = repo.findById(id)
                .orElseThrow(() -> new NotFoundException("Категория не найдена"));
        mapper.updateEntity(req, c);
        return mapper.toResponse(repo.save(c));
    }
    public void delete(UUID id) {
        if (!repo.existsById(id))
            throw new NotFoundException("Категория не найдена");
        repo.deleteById(id);
    }
}
</file>

<file path="services/ContentCardService.java">
package com.kosmetichka.backend.services;

import com.kosmetichka.backend.dtos.requests.create.ContentCardCreateDto;
import com.kosmetichka.backend.dtos.requests.update.ContentCardUpdateDto;
import com.kosmetichka.backend.dtos.responses.ContentCardResponse;
import com.kosmetichka.backend.models.api.ContentCard;
import com.kosmetichka.backend.models.enums.ContentType;
import com.kosmetichka.backend.repos.ContentCardRepo;
import com.kosmetichka.backend.utilities.exceptions.NotFoundException;
import com.kosmetichka.backend.utilities.mappers.ContentCardMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ContentCardService {
    private final ContentCardRepo repo;
    private final ContentCardMapper mapper;

    public List<ContentCardResponse> get() {
        return repo.findAll().stream().map(mapper::toResponse).toList();
    }
    public ContentCardResponse getById(UUID id) {
        return mapper.toResponse(repo.findById(id)
                .orElseThrow(() -> new NotFoundException("Карточка с контентом не найдена")));
    }
    public List<ContentCardResponse> getByType(ContentType type) {
        return repo.findByType(type).stream().map(mapper::toResponse).toList();
    }
    public ContentCardResponse create(ContentCardCreateDto req) {
        return mapper.toResponse(repo.save(mapper.toEntity(req)));
    }
    public ContentCardResponse update(UUID id, ContentCardUpdateDto req) {
        ContentCard c = repo.findById(id)
                .orElseThrow(() -> new NotFoundException("Карточка с контентом не найдена"));
        mapper.updateEntity(req, c);
        return mapper.toResponse(repo.save(c));
    }
    public void delete(UUID id) {
        if (!repo.existsById(id))
            throw new NotFoundException("Карточка с контентом не найдена");
        repo.deleteById(id);
    }
}
</file>

<file path="services/EmailService.java">
package com.kosmetichka.backend.services;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender sender;

    public void sendPasswordResetEmail(String to, String resetLink) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(to);
        msg.setSubject("Сброс пароля - КоSметичка");
        msg.setText("Для сброса пароля перейдите по ссылке - " + resetLink
                + "\n\nСсылка действительна в течение 15 минут. Если вы не запрашивали сброс пароля, просто игнорируйте это письмо.");
        sender.send(msg);
    }
}
</file>

<file path="services/FileStorageService.java">
package com.kosmetichka.backend.services;

import com.kosmetichka.backend.utilities.exceptions.BadRequestException;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import io.minio.RemoveObjectArgs;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileStorageService {
    private final MinioClient client;

    @Value("${minio.bucket}")
    private String bucket;
    @Value("${minio.url}")
    private String url;

    private static final List<String> ALLOWED_TYPES = List.of("image/jpeg", "image/png", "image/webp");
    private String getExtension(String filename) {
        if (filename == null || !filename.contains(".")) return "";
        return filename.substring(filename.lastIndexOf('.'));
    }

    public String upload(MultipartFile file) {
        if (file.isEmpty())
            throw new BadRequestException("Файл пустой");
        if (!ALLOWED_TYPES.contains(file.getContentType()))
            throw new BadRequestException("Разрешены только изображения форматов JPEG, PNG или WEBP");

        String ext = getExtension(file.getOriginalFilename());
        String fileName = UUID.randomUUID() + ext;

        try (InputStream is = file.getInputStream()) {
            client.putObject(PutObjectArgs.builder()
                            .bucket(bucket)
                            .object(fileName)
                            .stream(is, file.getSize(), -1)
                            .contentType(file.getContentType())
                    .build());
        } catch (Exception e) {
            throw new RuntimeException("Не удалось загрузить файл", e);
        }
        return url + "/" + bucket + "/" + fileName;
    }
    public void delete(String fileUrl) {
        if (fileUrl == null || fileUrl.isBlank())
            return;

        String fileName = fileUrl.substring(fileUrl.lastIndexOf('/') + 1);
        try {
            client.removeObject(RemoveObjectArgs.builder()
                            .bucket(bucket)
                            .object(fileName)
                    .build());
        }
        catch (Exception _) {}
    }
}
</file>

<file path="services/PasswordResetService.java">
package com.kosmetichka.backend.services;

import com.kosmetichka.backend.dtos.requests.reset_password.ForgotPasswordDto;
import com.kosmetichka.backend.dtos.requests.reset_password.ResetPasswordDto;
import com.kosmetichka.backend.models.api.PasswordResetToken;
import com.kosmetichka.backend.models.api.User;
import com.kosmetichka.backend.repos.PasswordResetTokenRepo;
import com.kosmetichka.backend.repos.UserRepo;
import com.kosmetichka.backend.utilities.exceptions.BadRequestException;
import com.kosmetichka.backend.utilities.exceptions.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PasswordResetService {
    private final UserRepo repo;
    private final PasswordResetTokenRepo tokenRepo;
    private final EmailService service;
    private final PasswordEncoder encoder;

    @Value("${app.frontend-url}")
    private String frontendUrl;
    @Value("${app.password-reset-expiration}")
    private long expiration;

    @Transactional
    public void requestReset(ForgotPasswordDto req) {
        User u = repo.findByEmail(req.getEmail())
                .orElseThrow(() -> new NotFoundException("Пользователь с таким email не найден"));
        tokenRepo.deleteByUser(u);

        String token = UUID.randomUUID().toString();
        PasswordResetToken resetToken = PasswordResetToken.builder()
                .token(token)
                .user(u)
                .expiresAt(LocalDateTime.now().plus(Duration.ofMillis(expiration)))
                .build();
        tokenRepo.save(resetToken);

        String link = frontendUrl + "/reset-password?token=" + token;
        service.sendPasswordResetEmail(u.getEmail(), link);
    }
    @Transactional
    public void resetPassword(ResetPasswordDto req) {
        PasswordResetToken resetToken = tokenRepo.findByToken(req.getToken())
                .orElseThrow(() -> new BadRequestException("Недействительная ссылка для сброса пароля!"));

        if (resetToken.getExpiresAt().isBefore(LocalDateTime.now())) {
            tokenRepo.delete(resetToken);
            throw new BadRequestException("Срок действия ссылки уже истек");
        }

        User u = resetToken.getUser();
        u.setPassword(encoder.encode(req.getNewPassword()));
        repo.save(u);

        tokenRepo.delete(resetToken);
    }
}
</file>

<file path="services/ProductService.java">
package com.kosmetichka.backend.services;

import com.kosmetichka.backend.dtos.requests.create.ProductCreateDto;
import com.kosmetichka.backend.dtos.requests.filter.ProductFilterDto;
import com.kosmetichka.backend.dtos.requests.filter.ProductSpecification;
import com.kosmetichka.backend.dtos.requests.update.ProductUpdateDto;
import com.kosmetichka.backend.dtos.responses.PageResponse;
import com.kosmetichka.backend.dtos.responses.ProductResponse;
import com.kosmetichka.backend.models.api.Product;
import com.kosmetichka.backend.repos.BrandRepo;
import com.kosmetichka.backend.repos.CategoryRepo;
import com.kosmetichka.backend.repos.ProductRepo;
import com.kosmetichka.backend.utilities.exceptions.NotFoundException;
import com.kosmetichka.backend.utilities.mappers.ProductMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepo repo;
    private final ProductMapper mapper;
    private final CategoryRepo cRepo;
    private final BrandRepo bRepo;

    public PageResponse<ProductResponse> get(ProductFilterDto f, Pageable pageable) {
        Page<Product> page = repo.findAll(ProductSpecification.withFilter(f), pageable);
        return PageResponse.from(page.map(mapper::toResponse));
    }
    public ProductResponse getById(UUID id) {
        return mapper.toResponse(repo.findById(id)
                .orElseThrow(() -> new NotFoundException("Товар не найден")));
    }
    public ProductResponse create(ProductCreateDto req) {
        Product p = mapper.toEntity(req);
        p.setCategory(cRepo.findById(req.getCategoryId())
                .orElseThrow(() -> new NotFoundException("Категория не найдена")));
        p.setBrand(bRepo.findById(req.getBrandId())
                .orElseThrow(() -> new NotFoundException("Производитель не найден")));
        return mapper.toResponse(repo.save(p));
    }
    public ProductResponse update(UUID id, ProductUpdateDto req) {
        Product product = repo.findById(id)
                .orElseThrow(() -> new NotFoundException("Товар не найден"));
        mapper.updateEntity(req, product);
        if (req.getCategoryId() != null)
            product.setCategory(cRepo.findById(req.getCategoryId())
                    .orElseThrow(() -> new NotFoundException("Категория не найдена")));
        if (req.getBrandId() != null)
            product.setBrand(bRepo.findById(req.getBrandId())
                    .orElseThrow(() -> new NotFoundException("Производитель не найден")));
        return mapper.toResponse(repo.save(product));
    }
    public void delete(UUID id) {
        if (!repo.existsById(id))
            throw new NotFoundException("Товар не найден");
        repo.deleteById(id);
    }
}
</file>

<file path="services/ShopService.java">
package com.kosmetichka.backend.services;

import com.kosmetichka.backend.dtos.requests.create.ShopCreateDto;
import com.kosmetichka.backend.dtos.requests.update.ShopUpdateDto;
import com.kosmetichka.backend.dtos.responses.ShopResponse;
import com.kosmetichka.backend.models.api.Shop;
import com.kosmetichka.backend.repos.ShopRepo;
import com.kosmetichka.backend.utilities.exceptions.NotFoundException;
import com.kosmetichka.backend.utilities.mappers.ShopMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ShopService {
    private final ShopRepo repo;
    private final ShopMapper mapper;

    public List<ShopResponse> get() {
        return repo.findAll().stream().map(mapper::toResponse).toList();
    }
    public ShopResponse getById(UUID id) {
        return mapper.toResponse(repo.findById(id)
                .orElseThrow(() -> new NotFoundException("Магазин не найден")));
    }
    public ShopResponse create(ShopCreateDto req) {
        return mapper.toResponse(repo.save(mapper.toEntity(req)));
    }
    public ShopResponse update(UUID id, ShopUpdateDto req) {
        Shop s = repo.findById(id)
                .orElseThrow(() -> new NotFoundException("Магазин не найден"));
        mapper.updateEntity(req, s);
        return mapper.toResponse(repo.save(s));
    }
    public void delete(UUID id) {
        if (!repo.existsById(id))
            throw new NotFoundException("Магазин не найден");
        repo.deleteById(id);
    }
}
</file>

<file path="services/UserService.java">
package com.kosmetichka.backend.services;

import com.kosmetichka.backend.dtos.requests.update.PasswordUpdateDto;
import com.kosmetichka.backend.dtos.requests.update.UserUpdateDto;
import com.kosmetichka.backend.dtos.responses.StatisticsResponse;
import com.kosmetichka.backend.dtos.responses.UserResponse;
import com.kosmetichka.backend.models.api.User;
import com.kosmetichka.backend.repos.UserRepo;
import com.kosmetichka.backend.security.UserPrincipal;
import com.kosmetichka.backend.utilities.exceptions.BadRequestException;
import com.kosmetichka.backend.utilities.exceptions.NotFoundException;
import com.kosmetichka.backend.utilities.mappers.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepo repo;
    private final UserMapper mapper;
    private final PasswordEncoder encoder;

    public List<StatisticsResponse> getStatistics() {
        return repo.countRegistrationsByDay().stream()
                .map(r -> new StatisticsResponse((LocalDate) r[0], (long) r[1]))
                .toList();
    }
    public UserResponse getProfile(UserPrincipal pr) {
        return mapper.toResponse(pr.getUser());
    }
    public UserResponse updateProfile(UserPrincipal pr, UserUpdateDto req) {
        User u = repo.findById(pr.getId())
                .orElseThrow(() -> new NotFoundException("Пользователь не найден"));
        mapper.updateEntity(req, u);
        return mapper.toResponse(repo.save(u));
    }
    public void changePassword(UserPrincipal pr, PasswordUpdateDto req) {
        User u = repo.findById(pr.getId())
                .orElseThrow(() -> new NotFoundException("Пользователь не найден"));
        if (!encoder.matches(req.getOldPassword(), u.getPassword()))
            throw new BadRequestException("Неверный пароль");
        u.setPassword(encoder.encode(req.getNewPassword()));
        repo.save(u);
    }
    public List<UserResponse> get() {
        return repo.findAll().stream().map(mapper::toResponse).toList();
    }
    public void delete(UUID id) {
        if (!repo.existsById(id))
            throw new NotFoundException("Пользователь не найден");
        repo.deleteById(id);
    }
}
</file>

<file path="utilities/exceptions/BadRequestException.java">
package com.kosmetichka.backend.utilities.exceptions;

public class BadRequestException extends RuntimeException {
    public BadRequestException(String message) {
        super(message);
    }
}
</file>

<file path="utilities/exceptions/ForbiddenException.java">
package com.kosmetichka.backend.utilities.exceptions;

public class ForbiddenException extends RuntimeException {
    public ForbiddenException(String message) {
        super(message);
    }
}
</file>

<file path="utilities/exceptions/GlobalExceptionHandler.java">
package com.kosmetichka.backend.utilities.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<Map<String, String>> onNotFound(NotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", e.getMessage()));
    }
    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<Map<String, String>> handleBadRequest(BadRequestException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", e.getMessage()));
    }
    @ExceptionHandler(ForbiddenException.class)
    public ResponseEntity<Map<String, String>> handleForbidden(ForbiddenException e) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("message", e.getMessage()));
    }
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<Map<String, String>> handleBadCredentials(BadCredentialsException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Неверный email или пароль"));
    }
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidation(MethodArgumentNotValidException e) {
        Map<String, String> errors = new HashMap<>();
        e.getBindingResult().getFieldErrors()
                .forEach(err -> errors.put(err.getField(), err.getDefaultMessage()));
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
    }
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleGeneral(Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("message", "Что-то пошло не так на сервере"));
    }
}
</file>

<file path="utilities/exceptions/NotFoundException.java">
package com.kosmetichka.backend.utilities.exceptions;

public class NotFoundException extends RuntimeException {
    public NotFoundException(String message) {
        super(message);
    }
}
</file>

<file path="utilities/mappers/AppealMapper.java">
package com.kosmetichka.backend.utilities.mappers;

import com.kosmetichka.backend.dtos.requests.create.ClientQuestionCreateDto;
import com.kosmetichka.backend.dtos.requests.create.SupplierRequestCreateDto;
import com.kosmetichka.backend.dtos.requests.update.AppealUpdateDto;
import com.kosmetichka.backend.dtos.responses.ClientQuestionResponse;
import com.kosmetichka.backend.dtos.responses.SupplierRequestResponse;
import com.kosmetichka.backend.models.api.Appeal;
import com.kosmetichka.backend.models.api.ClientQuestion;
import com.kosmetichka.backend.models.api.SupplierRequest;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface AppealMapper {
    @Mapping(target = "appealType", constant = "CLIENT_QUESTION")
    ClientQuestionResponse toResponse(ClientQuestion q);
    @Mapping(target = "appealType", constant = "SUPPLIER_REQUEST")
    SupplierRequestResponse toResponse(SupplierRequest req);
    ClientQuestion toEntity(ClientQuestionCreateDto req);
    SupplierRequest toEntity(SupplierRequestCreateDto req);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntity(AppealUpdateDto req, @MappingTarget Appeal a);
}
</file>

<file path="utilities/mappers/AttributeMapper.java">
package com.kosmetichka.backend.utilities.mappers;

import com.kosmetichka.backend.dtos.requests.create.AttributeCreateDto;
import com.kosmetichka.backend.dtos.requests.update.AttributeUpdateDto;
import com.kosmetichka.backend.dtos.responses.AttributeResponse;
import com.kosmetichka.backend.models.api.Attribute;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface AttributeMapper {
    AttributeResponse toResponse(Attribute a);
    @Mapping(target = "category.id", source = "categoryId")
    Attribute toEntity(AttributeCreateDto req);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntity(AttributeUpdateDto req, @MappingTarget Attribute a);
}
</file>

<file path="utilities/mappers/AttributeValueMapper.java">
package com.kosmetichka.backend.utilities.mappers;

import com.kosmetichka.backend.dtos.requests.create.AttributeValueCreateDto;
import com.kosmetichka.backend.dtos.requests.update.AttributeValueUpdateDto;
import com.kosmetichka.backend.dtos.responses.AttributeValueResponse;
import com.kosmetichka.backend.models.api.AttributeValue;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {AttributeMapper.class})
public interface AttributeValueMapper {
    AttributeValueResponse toResponse(AttributeValue value);
    @Mapping(target = "attribute.id", source = "attributeId")
    AttributeValue toEntity(AttributeValueCreateDto req);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntity(AttributeValueUpdateDto req, @MappingTarget AttributeValue value);
}
</file>

<file path="utilities/mappers/BrandMapper.java">
package com.kosmetichka.backend.utilities.mappers;

import com.kosmetichka.backend.dtos.requests.create.BrandCreateDto;
import com.kosmetichka.backend.dtos.requests.update.BrandUpdateDto;
import com.kosmetichka.backend.dtos.responses.BrandResponse;
import com.kosmetichka.backend.models.api.Brand;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface BrandMapper {
    BrandResponse toResponse(Brand b);
    Brand toEntity(BrandCreateDto req);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntity(BrandUpdateDto req, @MappingTarget Brand b);
}
</file>

<file path="utilities/mappers/CartMapper.java">
package com.kosmetichka.backend.utilities.mappers;

import com.kosmetichka.backend.dtos.responses.CartResponse;
import com.kosmetichka.backend.models.api.Cart;
import org.mapstruct.*;

import java.math.BigDecimal;

@Mapper(componentModel = "spring", uses = {CartPositionMapper.class})
public interface CartMapper {
    CartResponse toResponse(Cart c);

    @AfterMapping
    default void calculateTotal(@MappingTarget CartResponse res) {
        if (res.getPositions() == null) return;

        BigDecimal total = res.getPositions().stream()
                .map(p -> p.getPrice().multiply(BigDecimal.valueOf(p.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        res.setTotal(total);
    }
}
</file>

<file path="utilities/mappers/CartPositionMapper.java">
package com.kosmetichka.backend.utilities.mappers;

import com.kosmetichka.backend.dtos.responses.CartPositionResponse;
import com.kosmetichka.backend.models.api.CartPosition;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {ProductMapper.class})
public interface CartPositionMapper {
    CartPositionResponse toResponse(CartPosition pos);
}
</file>

<file path="utilities/mappers/CategoryMapper.java">
package com.kosmetichka.backend.utilities.mappers;

import com.kosmetichka.backend.dtos.requests.create.CategoryCreateDto;
import com.kosmetichka.backend.dtos.requests.update.CategoryUpdateDto;
import com.kosmetichka.backend.dtos.responses.CategoryResponse;
import com.kosmetichka.backend.models.api.Category;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {AttributeMapper.class})
public interface CategoryMapper {
    CategoryResponse toResponse(Category c);
    Category toEntity(CategoryCreateDto req);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntity(CategoryUpdateDto req, @MappingTarget Category c);
}
</file>

<file path="utilities/mappers/ContentCardMapper.java">
package com.kosmetichka.backend.utilities.mappers;

import com.kosmetichka.backend.dtos.requests.create.ContentCardCreateDto;
import com.kosmetichka.backend.dtos.requests.update.ContentCardUpdateDto;
import com.kosmetichka.backend.dtos.responses.ContentCardResponse;
import com.kosmetichka.backend.models.api.ContentCard;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface ContentCardMapper {
    ContentCardResponse toResponse(ContentCard card);
    ContentCard toEntity(ContentCardCreateDto req);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntity(ContentCardUpdateDto req, @MappingTarget ContentCard card);
}
</file>

<file path="utilities/mappers/ProductMapper.java">
package com.kosmetichka.backend.utilities.mappers;

import com.kosmetichka.backend.dtos.requests.create.ProductCreateDto;
import com.kosmetichka.backend.dtos.requests.update.ProductUpdateDto;
import com.kosmetichka.backend.dtos.responses.ProductResponse;
import com.kosmetichka.backend.models.api.Product;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {CategoryMapper.class, BrandMapper.class, AttributeValueMapper.class})
public interface ProductMapper {
    ProductResponse toResponse(Product p);
    @Mapping(target = "category.id", source = "categoryId")
    @Mapping(target = "brand.id", source = "brandId")
    Product toEntity(ProductCreateDto req);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntity(ProductUpdateDto req, @MappingTarget Product p);
}
</file>

<file path="utilities/mappers/ShopContactMapper.java">
package com.kosmetichka.backend.utilities.mappers;

import com.kosmetichka.backend.dtos.requests.create.ShopContactCreateDto;
import com.kosmetichka.backend.dtos.responses.ShopContactResponse;
import com.kosmetichka.backend.models.api.ShopContact;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface ShopContactMapper {
    ShopContactResponse toResponse(ShopContact contact);
    ShopContact toEntity(ShopContactCreateDto req);
}
</file>

<file path="utilities/mappers/ShopMapper.java">
package com.kosmetichka.backend.utilities.mappers;

import com.kosmetichka.backend.dtos.requests.create.ShopCreateDto;
import com.kosmetichka.backend.dtos.requests.update.ShopUpdateDto;
import com.kosmetichka.backend.dtos.responses.ShopResponse;
import com.kosmetichka.backend.models.api.Shop;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {ShopContactMapper.class})
public interface ShopMapper {
    ShopResponse toResponse(Shop s);
    Shop toEntity(ShopCreateDto req);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntity(ShopUpdateDto req, @MappingTarget Shop s);
}
</file>

<file path="utilities/mappers/UserMapper.java">
package com.kosmetichka.backend.utilities.mappers;

import com.kosmetichka.backend.dtos.requests.create.RegisterDto;
import com.kosmetichka.backend.dtos.requests.update.UserUpdateDto;
import com.kosmetichka.backend.dtos.responses.UserResponse;
import com.kosmetichka.backend.models.api.User;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserResponse toResponse(User u);
    User toEntity(RegisterDto req);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntity(UserUpdateDto req, @MappingTarget User u);
}
</file>

</files>
