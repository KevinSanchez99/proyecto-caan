import { useRef } from 'react';
import { createAnimalRequest } from '../../../api/auth'; 

export default function ModalAnimal() {
    // 1. Creamos la referencia para el dialog
    const modalRef = useRef(null);

    // 2. Funciones para controlar la apertura y cierre
    const abrirModal = () => {
        if (modalRef.current) modalRef.current.showModal();
    };

    const cerrarModal = () => {
        if (modalRef.current) modalRef.current.close();
    };

    // 3. Función para enviar los datos adaptados al modelo del backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        // Extraemos los valores en crudo del formulario
        const rawData = Object.fromEntries(formData.entries());

        // Construimos el objeto EXACTAMENTE como lo pide Mongoose
        const payload = {
            nombre: rawData.nombre,
            especie: 'Perro', // Queda fijo para todos los ingresos de este formulario
            raza: rawData.raza,
            
            // Transformamos sexo para que coincida con el Enum (Macho/Hembra con mayúscula)
            sexo: rawData.sexo === 'macho' ? 'Macho' : 'Hembra', 
            
            tamaño: rawData.tamaño,
            estado: 'Disponible', 
            
            // Sub-documento de edad
            edad: {
                valor: Number(rawData.edad), 
                unidad: rawData.unidad_edad 
            },
            
            // Sub-documento de salud
            salud: {
                vacunado: rawData.vacunado === "1", // Convierte "1" a true, "0" a false
                castrado: rawData.castrado === "1",
                condiciones_especiales: 'Ninguna' 
            },
            
            descripcion: rawData.descripcion,
            
            // Mock de imagen por ahora (hasta que el backend soporte archivos)
            imagenes: ["https://ejemplo.com/perro.jpg"] 
        };

        try {
            // Le mandamos el objeto 'payload' (JSON puro)
            const respuesta = await createAnimalRequest(payload);
            console.log('Animal creado con éxito:', respuesta.data);
            alert("¡Ficha creada con éxito!");
            
            cerrarModal();
            e.target.reset(); // Limpia el formulario

        } catch (error) {
            console.error('Error al crear el animal:', error);
            alert("Hubo un error al guardar. Revisa la consola para más detalles.");
        }
    };

    return (
        <>
            <button className="p-3 rounded-full border border-outline-variant hover:bg-surface-container-high transition-colors text-on-surface-variant" onClick={abrirModal}>
                Nuevo 
            </button>

            <dialog ref={modalRef} className="p-6 rounded-2xl border-none shadow-xl backdrop:bg-black/50 w-[90%] bg-surface-container-lowest text-on-surface">
                <h3 className="text-xl font-semibold mb-5">Ingresar Nuevo Rescatado</h3>
                
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    
                    <div>
                        <label className="block text-sm mb-1 text-on-surface-variant">Nombre del perro</label>
                        <input 
                            type="text" 
                            className="w-full p-3 rounded-lg border border-outline-variant bg-surface focus:border-primary outline-none" 
                            placeholder="Ej: Firulais"
                            name="nombre" 
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1 text-on-surface-variant">Raza</label>
                        <input 
                            type="text" 
                            className="w-full p-3 rounded-lg border border-outline-variant bg-surface focus:border-primary outline-none" 
                            placeholder="Ej: Mestizo" 
                            name="raza"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1 text-on-surface-variant">Sexo</label>
                        <select className="w-full p-3 rounded-lg border border-outline-variant bg-surface focus:border-primary outline-none" name="sexo" required>
                            <option value="">Selecciona el sexo</option>
                            <option value="macho">Macho</option>
                            <option value="hembra">Hembra</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm mb-1 text-on-surface-variant">Tamaño</label>
                        <select className="w-full p-3 rounded-lg border border-outline-variant bg-surface focus:border-primary outline-none" name="tamaño" required>
                            <option value="">Selecciona el tamaño</option>
                            <option value="Pequeño">Pequeño</option>
                            <option value="Mediano">Mediano</option>
                            <option value="Grande">Grande</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm mb-1 text-on-surface-variant">Edad aproximada</label>
                        <div className="flex gap-2">
                            <input 
                                type="text" 
                                inputMode="numeric" 
                                pattern="[0-9]*"
                                className="w-full p-3 rounded-lg border border-outline-variant bg-surface focus:border-primary outline-none" 
                                placeholder="Ej: 2" 
                                name="edad"
                                required
                                onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, ''); }}
                            />

                            <select className="w-full p-3 rounded-lg border border-outline-variant bg-surface focus:border-primary outline-none" name="unidad_edad" required>
                                <option value=""> Unidad</option>
                                <option value="meses">Meses</option>
                                <option value="años">Años</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm mb-1 text-on-surface-variant">Vacunado</label>
                        <select className="w-full p-3 rounded-lg border border-outline-variant bg-surface focus:border-primary outline-none" name="vacunado" required>
                            <option value="">Selecciona una opción</option>
                            <option value="1">Sí</option>
                            <option value="0">No</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm mb-1 text-on-surface-variant">Castrado</label>
                        <select className="w-full p-3 rounded-lg border border-outline-variant bg-surface focus:border-primary outline-none" name="castrado" required>
                            <option value="">Selecciona una opción</option>
                            <option value="1">Sí</option>
                            <option value="0">No</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm mb-1 text-on-surface-variant">Descripción</label>
                        <textarea 
                            className="w-full p-3 rounded-lg border border-outline-variant bg-surface focus:border-primary outline-none" 
                            placeholder="Ej: Muy amigable, le gusta jugar con otros"
                            name="descripcion"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1 text-on-surface-variant">Cargue una Foto (Requiere configuración en el Backend)</label>
                        <input 
                            type="file" 
                            className="w-full p-3 rounded-lg border border-outline-variant bg-surface focus:border-primary outline-none" 
                            accept="image/png, image/jpeg, image/webp"
                            name="foto"
                        />
                    </div>
                    
                    <div className="flex justify-end gap-3 mt-4">
                        <button 
                            type="button" 
                            onClick={cerrarModal}
                            className="px-5 py-2.5 rounded-full font-medium text-on-surface-variant hover:bg-surface-container-high transition-colors"
                        >Cancelar</button>
                        <button 
                            type="submit"
                            className="px-5 py-2.5 rounded-full font-medium bg-primary text-on-primary hover:opacity-90 transition-opacity"
                        >Crear Ficha</button>
                    </div>
                </form>
            </dialog>
        </>
    );
}