import React from 'react';

const Map = () => {
    return (
        <div style={{ width: '100%', height: '400px', borderRadius: '8px', overflow: 'hidden' }}>
            <iframe
                title="Ubicación de nuestro negocio"
                /* REEMPLAZA EL ENLACE DE ABAJO POR EL QUE COPIASTE DE GOOGLE MAPS */
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12477.624232462624!2d-58.77969967517937!3d-38.57049607139508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x958fbd3dd2c3bc67%3A0xf38c8259a2a91cb8!2sProtectora%20De%20Animales%20Caan%20Necochea!5e0!3m2!1ses-419!2sar!4v1781816917706!5m2!1ses-419!2sar"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            />
        </div>
    );
};

export default Map;
