package miguel_amaya_pruebat.Repositorio;



import miguel_amaya_pruebat.Entidades.Producto;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ProductoRepositorio extends JpaRepository<Producto, Long> {
}