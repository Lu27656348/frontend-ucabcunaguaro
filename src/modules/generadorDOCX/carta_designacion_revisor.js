import * as docx from 'docx';
import file_saver from 'file-saver'
const { saveAs } = file_saver
// Load the full build.
import lodash from 'lodash';
const { _ } =  lodash;
const { TableRow,BorderStyle } = docx;
const { WidthType,Paragraph } = docx;
const { VerticalAlign, Document } = docx;
const { TextRun, AlignmentType } = docx;
const { SectionType, Header } = docx;
const { HeightRule,TableCell } = docx;
const { Footer, LineRuleType } = docx;
const { Table, PageBreak } = docx;
const { HeadingLevel,Packer } = docx;
//const { TableRow,BorderStyle } = docx;

import * as fs from 'fs'
const { writeFileSync } = fs;

const nombre_profesor = 'Franklin Bello';
const modalidad = 'TEG';
const alumno= 'Luis C Somoza';
const tutor = 'Jannelly Bello';
const correo_administrador = 'lmedinac@ucab.edu.ve';
const administrador = "Luz E. Medina";
const fecha = "";
/*
const Carta_designacion = {
    propuesta: {
        titulo: "Creacion de robots para el mantenimiento de la biblioteca",
        alumno: [{
            cedula: '',
            nombres: '',
            apellidos: ''
        }],
        tutor: ''
    },
    fecha_designacion: '',
    administrador: "Luz E. Medina",
    correo_administrador: '',
    modalidad: '',
    revisor: ''
}
*/
export const generarCartaDesignacionRevisor = (Carta_designacion) => {
    console.log("Carta_designacion");
    console.log(Carta_designacion);

    let tutor = '';
    if (Carta_designacion.modalidad=='E'){
        tutor = Carta_designacion.propuesta.tutor_academico.apellidos + ', ' + Carta_designacion.propuesta.tutor_academico.nombres
    }else{
        tutor = Carta_designacion.propuesta.tutor_academico.apellidos + ', ' + Carta_designacion.propuesta.tutor_academico.nombres
    }
    console.log(tutor);
    let modalidadCartaDesignacion = null;
    if(Carta_designacion.modalidad == 'E'){
        modalidadCartaDesignacion = "Experimental"
    }else{
        modalidadCartaDesignacion = "Instrumental"
    }
    const doc = new Document({
        creator: "Luis C. Somoza & Wladimir SanVicente ",
        title: "Carta de designación - Revisor de propuesta de trabajo de grado",
        description: "Carta de designación - Revisor de propuesta de trabajo de grado",
        styles: {
            default: {
                heading1: {
                    run: {
                        size: 30,
                        bold: true,
                        italics: true,
                        color: "FF0000",
                    },
                    paragraph: {
                        spacing: {
                            after: 200,
                        },
                    },
                },
            },
            paragraphStyles: [
                {
                    id: "aside",
                    name: "Aside",
                    basedOn: "Normal",
                    next: "Normal",
                    run: {
                        size: 22,
                    },
                    paragraph: {
                        spacing: {
                            line: 276,
                        },
                    },
                },
                {
                    id: "despedida",
                    name: "Despedida",
                    basedOn: "Normal",
                    next: "Normal",
                    run: {
                        size: 26,
                    },
                    paragraph: {
                        spacing: {
                            line: 276,
                        },
                    },
                }
            ]
        },
        sections: [{
            properties: {
                type: SectionType.CONTINUOUS,
                margin: {
                    top: 200,
                    right: 200,
                    bottom: 200,
                    left: 200,
                }
            },
            headers: {
                default: new Header({
                    children: [new Paragraph({
                        children: [
                            /*
                            new ImageRun({
                                data: fs.readFileSync('logo.png'),
                                transformation: {
                                    width: 400,
                                    height: 100,
                                },
                            }),
                            */
                        ],
                        alignment: AlignmentType.LEFT
                    })],
                }),
            },
            footers: {
                default: new Footer({
                    children: [
                        new Paragraph({
                            children: [
                                /*
                                new ImageRun({
                                    data: fs.readFileSync('Untitled.png'),
                                    transformation: {
                                        width: 600,
                                        height: 15,
                                    },
                                    alignment: AlignmentType.CENTER
                                }),
                                */
                            ],
                            alignment: AlignmentType.CENTER
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: "UNIVERSIDAD CATÓLICA ANDRÉS BELLO – Extensión Guayana",
                                })
                            ],
                            alignment: AlignmentType.CENTER
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: "Avenida Atlántico, Ciudad Guayana 8050",
                                })
                            ],
                            alignment: AlignmentType.CENTER
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: "Bolívar, Venezuela. Teléfono: +58-286-6000111"
                                })
                            ],
                            alignment: AlignmentType.CENTER
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: "URL: http://www.guayanaweb.ucab.edu.ve/escuela-de-ingenieria-informatica.html"
                                })
                            ],
                            alignment: AlignmentType.CENTER
                        })
                    ],
                }),
            },
            children: [
                new Paragraph({
                    style: "aside",
                    children: [
                        new TextRun({
                            text: 'Puerto Ordaz, ' + Carta_designacion.fecha_designacion.toLocaleDateString(),
                            font: "Trebuchet MS",
                        })
                    ],
                    alignment: AlignmentType.RIGHT,
                    spacing: {
                        after: 200,
                        line: 355,
                        lineRule: LineRuleType.AUTO,
                    },
                }),
                new Paragraph({
                    style: "aside",
                    children: [
                        new TextRun({
                            text: 'Asunto:',
                            bold: true,
                            font: "Trebuchet MS"
                        }),
                        new TextRun({
                            text: ' Designación de Profesor Revisor',
                            font: "Trebuchet MS"
                        }),
                    ],
                    spacing: {
                        after: 200,
                        line: 355,
                        lineRule: LineRuleType.AUTO,
                    }
                }),
                new Paragraph({
                    style: "aside",
                    children: [
                        new TextRun({
                            text: 'Estimado(a) Profesor(a):',
                            bold: true,
                            font: "Trebuchet MS"
                        }),
                        new TextRun({
                            text: ' ' + Carta_designacion.revisor,
                            bold: true,
                            font: "Trebuchet MS"
                        }),
                    ],
                    spacing: {
                        after: 200,
                        line: 355,
                        lineRule: LineRuleType.AUTO,
                    }
                }),
                new Paragraph({
                    style: "aside",
                    children: [
                        new TextRun({
                            text: 'Saludándole cordialmente ',
                            font: "Trebuchet MS"
                        })
                    ],
                    spacing: {
                        after: 200,
                        line: 355,
                        lineRule: LineRuleType.AUTO,
                    }
                }),
                
                new Paragraph({
                    style: "aside",
                    children: [
                        new TextRun({
                            text: 'Mediante la presente, la Escuela de Ingeniería Informática desea darle un especial agradecimiento por su colaboración como profesor(a) experto(a), en el tema, en la revisión de la propuesta de Trabajo de Grado, modalidad ',
                            font: "Trebuchet MS"
                        }),
                        new TextRun({
                            text: modalidadCartaDesignacion,
                            bold: true,
                            font: "Trebuchet MS"
                        }),
                        new TextRun({
                            text: ' titulada: ',
                            font: "Trebuchet MS"
                        }),
                        new TextRun({
                            text: `"${Carta_designacion.propuesta.titulo}". `,
                            bold: true,
                            font: "Trebuchet MS"
                        }),
                        new TextRun({
                            text: 'Elaborada por el(la) estudiante: ',
                            font: "Trebuchet MS"
                        }),
                        new TextRun({
                            text: Carta_designacion.propuesta.alumno[0].apellidos + ', ' +Carta_designacion.propuesta.alumno[0].nombres,
                            bold: true,
                            font: "Trebuchet MS"
                        }),
                        new TextRun({
                            text: ' bajo la tutoría de ',
                            font: "Trebuchet MS"
                        }),
                        new TextRun({
                            text: tutor +'.',
                            bold: true,
                            font: "Trebuchet MS"
                        })
                    ],
                    alignment: AlignmentType.JUSTIFIED,
                    indent: {
                        firstLine: 400
                    },
                    spacing: {
                        after: 200,
                        line: 355,
                        lineRule: LineRuleType.AUTO,
                    }
                }),
                new Paragraph({
                    style: "aside",
                    children: [
                        new TextRun({
                            text: "Adjunto la propuesta y la planilla de evaluación personalizada con los puntos a evaluar, esta debe ser completada en todos sus ítems y luego enviada al correo electronico ",
                            font: "Trebuchet MS"
                        }),
                        new TextRun({
                            text: Carta_designacion.correo_administrador + ' ',
                            font: "Trebuchet MS"
                        }),
                        new TextRun({
                            text: "lo más pronto le sea posible.",
                            font: "Trebuchet MS"
                        })
                    ],
                    alignment: AlignmentType.JUSTIFIED,
                    indent: {
                        firstLine: 400
                    },
                    spacing: {
                        after: 200,
                        line: 355,
                        lineRule: LineRuleType.AUTO,
                    }
                }),
                new Paragraph({
                    style: "aside",
                    children: [
                        new TextRun({
                            text: "En caso que tenga a bien realizar alguna observación o sugerencia a la propuesta, le agradecemos realizar contacto con el(la) estudiante: ",
                            font: "Trebuchet MS"
                        }),
                        new TextRun({
                            text: Carta_designacion.propuesta.alumno[0].apellidos + ', ' + Carta_designacion.propuesta.alumno[0].nombres,
                            font: "Trebuchet MS"
                        }),
                        new TextRun({
                            text: " el(los) cuales estará(n) al pendiente para incorporar sus observaciones, antes de la evaluación definitiva en Consejo de Escuela de Ingeniería Informatica. ",
                            font: "Trebuchet MS"
                        })
                    ],
                    alignment: AlignmentType.JUSTIFIED,
                    indent: {
                        firstLine: 400
                    },
                    spacing: {
                        after: 200,
                        line: 355,
                        lineRule: LineRuleType.AUTO,
                    }
                }),
                new Paragraph({
                    style: "aside",
                    children: [
                        new TextRun({
                            text: "El tema presentado por el estudiante ya ha sido considerado como tema válido de Trabajo de Grado por el Comité de Trabajos de Grado de la Escuela de Ingeniería Informática. En caso que usted, como ",
                            font: "Trebuchet MS"
                        }),
                        new TextRun({
                            text: "revisor(a) experto(a), ",
                            bold: true,
                            font: "Trebuchet MS"
                        }),
                        new TextRun({
                            text: "considere que el mismo debe ser rechazado, agradecemos detallar sus razones por escrito, previa reunión con  los  estudiantes.",
                            font: "Trebuchet MS"
                        })
                    ],
                    indent: {
                        firstLine: 400
                    },
                    spacing: {
                        after: 200,
                        line: 355,
                        lineRule: LineRuleType.AUTO,
                    }
                }),
                new Paragraph({
                    style: "despedida",
                    children: [
                        new TextRun({
                            text: Carta_designacion.administrador,
                            italics: true,
                            bold: true,
                            font: "Courgette"
                        })
                    ],
                    spacing: {
                        after: 200,
                        line: 355,
                        lineRule: LineRuleType.AUTO,
                    }
                })
            ],
        }]
    });
    const nombre_archivo = "Carta Designacion Revisor"
    Packer.toBlob(doc).then(blob => {
        saveAs(blob, nombre_archivo+" Planilla propuesta TEG.docx");
        //console.log("Documento creado de forma exitosa en el navegador");
    });
    /*
    Packer.toBuffer(doc).then((buffer) => {
        fs.writeFileSync("Carta Modelo Designacion Revisor - " + Carta_designacion.revisor + ".docx", buffer);
    });
    */
    
}
