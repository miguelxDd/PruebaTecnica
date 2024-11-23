package miguel_amaya_pruebat.Componentes;

import jakarta.annotation.PostConstruct;
import miguel_amaya_pruebat.Entidades.Rol;
import miguel_amaya_pruebat.Repositorio.RolRepository;
import org.springframework.stereotype.Component;

@Component
public class InitRoles {

    private final RolRepository rolRepository;

    public InitRoles(RolRepository rolRepository) {
        this.rolRepository = rolRepository;
    }

    @PostConstruct
    public void init() {
        if (rolRepository.findByNombre("ADMIN").isEmpty()) {
            Rol admin = new Rol();
            admin.setNombre("ADMIN");
            rolRepository.save(admin);
        }

        if (rolRepository.findByNombre("USER").isEmpty()) {
            Rol user = new Rol();
            user.setNombre("USER");
            rolRepository.save(user);
        }
    }
}
