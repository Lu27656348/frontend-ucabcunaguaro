<script setup>

    const props = defineProps({
        id_tg: String,
        titulo: String,
        modalidad: String,
        fecha_solicitud: String,
        estatus: String,
        id_ta: Number,
        id_admin_evaluador: Number
    });

</script>
<template>
    <div>
        <p>Codigo: {{ props.id_tg }}</p>
        <p>Titulo de propuesta: {{ props.titulo }}</p>
        <p>Modalidad: {{ props.modalidad == 'E'?'Experimental' : 'Instrumental' }}</p>
        <p>Fecha_solicitud: {{ props.fecha_solicitud }}</p>
    </div>
</template>