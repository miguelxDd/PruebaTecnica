package miguel_amaya_pruebat.Repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import miguel_amaya_pruebat.Entidades.Usuario;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    // Métodos personalizados, si los necesitas
    Optional<Usuario> findByUsername(String username);
}
