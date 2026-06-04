import { useRef } from 'react';
import { createAnimalRequest } from '../../../api/auth'; 

export default function ModalAnimal() {
   
    const modalRef = useRef(null);

    const abrirModal = () => {
        if (modalRef.current) modalRef.current.showModal();
    };

    const cerrarModal = () => {
        if (modalRef.current) modalRef.current.close();
    };

    {/* Funcion para convertir la imagen a texto 3/06/2026 */}
    const convertirABase64 = (archivo) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(archivo);
            fileReader.onload = () => {
                resolve(fileReader.result); // Devuelve el texto larguísimo
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    {/* Funcion que recopila los datos del formulario 3/06/2026 */}
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const rawData = Object.fromEntries(formData.entries());

        const archivoFoto = formData.get('foto');
        const imagenBase64 = await convertirABase64(archivoFoto);

        const payload = {
            nombre: rawData.nombre,
            especie: 'Perro',
            raza: rawData.raza,
            pelaje : rawData.pelaje,
            sexo: rawData.sexo === 'macho' ? 'Macho' : 'Hembra', 
            tamaño: rawData.tamaño,
            estado: 'Disponible', 
            edad: {
                valor: Number(rawData.edad), 
                unidad: rawData.unidad_edad 
            },
            salud: {
                vacunado: rawData.vacunado === "1",
                castrado: rawData.castrado === "1",
                desparacitado: rawData.desparacitado === "1",
                condiciones_especiales: rawData.observaciones || 'Ninguna'
            },
            descripcion: rawData.historia,
            imagenes: [imagenBase64] 
        };

        try {
            // Le mandamos el objeto 'payload' (JSON puro)
            const respuesta = await createAnimalRequest(payload);
            alert("¡Ficha creada con éxito!");
            cerrarModal();
            e.target.reset();
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

            <dialog ref={modalRef} className="m-auto p-6 rounded-2xl border-none shadow-xl backdrop:bg-black/50 w-[90%] bg-surface-container-lowest text-on-surface">
                <h2 className="text-xl font-semibold mb-5">Ingresar Nuevo Rescatado</h2>
                
                <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
                    <div className= " flex flex-row gap-10">
                        <div className = "flex flex-1 flex-col gap-5">
                            <h3 className="font-semibold mb-3">Datos generales</h3>

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
                                    <label className="block text-sm mb-1 text-on-surface-variant">Pelaje</label>
                                    <input 
                                        type="text" 
                                        className="w-full p-3 rounded-lg border border-outline-variant bg-surface focus:border-primary outline-none" 
                                        placeholder="Ej: Mestizo" 
                                        name="pelaje"
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
                            </div>

                                <div>
                                    <select className="w-full p-3 rounded-lg border border-outline-variant bg-surface focus:border-primary outline-none" name="unidad_edad" required>
                                        <option value=""> Unidad</option>
                                        <option value="meses">Meses</option>
                                        <option value="años">Años</option>
                                    </select>
                                </div>
                        </div>
                        
                        

                        

                        <div className = "flex flex-1 flex-col gap-5">
                            <h3 className="font-semibold mb-3" >Datos Medicos</h3>
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
                                <label className="block text-sm mb-1 text-on-surface-variant">Desparacitado</label>
                                <select className="w-full p-3 rounded-lg border border-outline-variant bg-surface focus:border-primary outline-none" name="desparacitado" required>
                                    <option value="">Selecciona una opción</option>
                                    <option value="1">Sí</option>
                                    <option value="0">No</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm mb-1 text-on-surface-variant">Observaciones</label>
                                <textarea 
                                    className="w-full p-3 rounded-lg border border-outline-variant bg-surface focus:border-primary outline-none resize-none h-32" 
                                    placeholder="Ej: cegera parcial , zordera "
                                    name="observaciones"
                                />
                            </div>
                        </div>


                        <div className = "flex flex-1 flex-col gap-5">
                            <h3 className="font-semibold mb-3">Mas Sobre Mi</h3>
                            <div>
                                <label className="block text-sm mb-1 text-on-surface-variant">Historia</label>
                                <textarea 
                                    className="w-full p-3 rounded-lg border border-outline-variant bg-surface focus:border-primary outline-none resize-none h-32"
                                    placeholder="Ej: Muy amigable, le gusta jugar con otros"
                                    name="historia"
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
                                    required
                                />
                            </div>
                        </div>

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