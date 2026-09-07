export interface Producto {
  id: string;
  marca: string;
  nombre: string;
  especificaciones: string;
  imagen: string;
}

export interface Categoria {
  id: string;
  titulo: string;
  descripcion: string;
  icono: string;
  productos: Producto[];
}

export interface Catalogo {
  categorias: Categoria[];
}