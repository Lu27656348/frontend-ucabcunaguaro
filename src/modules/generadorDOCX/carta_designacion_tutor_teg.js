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
import * as api from '../apiTools.js'
import * as fs from 'fs'
//Modelo de los datos de la carta de designación para inserción de datos
const Carta_designacion = {
    propuesta: {
        titulo: '',
        modalidad: '',
        alumnno: [{
            cedula: '',
            nombres: '',
            apellidos: ''
        }],
        tutor: ''
    },
    fecha_designacion: '',
    CDE: '',
    administrador: ''
}
/*
const alumnos = [ 
    {
        cedula: '27656348',
        nombres: 'Luis Carlos',
        apellidos: 'Somoza Ledezma'
    },
    {
        cedula: '27301846',
        nombres: 'Wladimir Josue',
        apellidos: 'SanVicente Suarez'
    }
]
*/
let flag = 1;
const generaTitulo = (titulo) => {
    if(flag === 1){
        flag = 0;
        const fila = new TableCell({
            children: [
                new Paragraph({
                    children: [
                        new  TextRun({
                            text: titulo
                        })
                    ]
                })
            ],
            rowSpan: 2,
        })
        return fila;
    }
    return;
}
const encabezadoTablaAlumno = new  TableRow({
    children : [
        new  TableCell({
            width: {
                size: 3505,
                type:  WidthType.DXA
            },
            children: [
                new  Paragraph({
                    children: [
                        new  TextRun({
                            text: "Estudiante",
                            bold: true,
                        })
                    ],
                    alignment:  AlignmentType.CENTER
                })
            ],
            verticalAlign:  VerticalAlign.CENTER,
        }),
        new  TableCell({
            width: {
                size: 3505,
                type:  WidthType.DXA
            },
            children: [
                new  Paragraph({
                    children: [
                        new  TextRun({
                            text: "Cedula",
                            bold: true,
                        })
                    ],
                    alignment:  AlignmentType.CENTER
                })
            ]
        }),
        new  TableCell({
            width: {
                size: 3505,
                type:  WidthType.DXA
            },
            children: [
                new  Paragraph({
                    children: [
                        new  TextRun({
                            text: "Titulo Trabajo de Grado",
                            bold: true,
                        })
                    ],
                    alignment:  AlignmentType.CENTER
                })
            ],
            verticalAlign:  VerticalAlign.CENTER,
        })
    ]
});
const generarTablaAlumno = (alumnos,titulo) => {
    console.log("Ejecutando generarTablaAlumno()")
    const filas = [];
    filas.push(encabezadoTablaAlumno)
    //filas.push(encabezadoTablaAlumno)
    
    alumnos.forEach(alumno => {
        let fila = new  TableRow({
            children: [
                new  TableCell({
                    children: [
                        new Paragraph({
                            children: [
                                new  TextRun({
                                    text: alumno.apellidos + ', ' + alumno.nombres
                                })
                            ]
                        })
                    ]
                }),
                new  TableCell({
                    children: [
                        new Paragraph({
                            children: [
                                new  TextRun({
                                    text: alumno.cedula
                                })
                            ]
                        })
                    ]
                }),
                generaTitulo(titulo)
            ]
        })
        filas.push(fila)
    });
    

    return filas

}
export const generarCartaDesignacionTutorTEG = (Carta_designacion,id) => {
    console.log(Carta_designacion)
    const doc = new  Document({
        creator: "Luis C. Somoza & Wladimir San Vicente",
        title: "Carta de designación - Tutor de propuesta de trabajo de grado experimental",
        description: "Carta de designación - Tutor de propuesta de trabajo de grado experimental",
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
                        size: 20,
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
                type:  SectionType.CONTINUOUS,
                margin: {
                    top: 150,
                    right: 150,
                    bottom: 150,
                    left: 150,
                }
            },
            headers: {
                default: new  Header({
                    children: [new  Paragraph({
                        children: [
                            /*
                            new  ImageRun({
                                data: fs.readFileSync('logo.png'),
                                transformation: {
                                    width: 400,
                                    height: 100,
                                },
                            }),
                            */
                        ],
                        alignment:  AlignmentType.LEFT
                    })],
                }),
            },
            footers: {
                default: new  Footer({
                    children: [
                        new  Paragraph({
                            children: [
                                /*
                                new  ImageRun({
                                    data: fs.readFileSync('Untitled.png'),
                                    transformation: {
                                        width: 600,
                                        height: 15,
                                    },
                                    alignment:  AlignmentType.CENTER
                                }),
                                */
                            ],
                            alignment:  AlignmentType.CENTER
                        }),
                        new  Paragraph({
                            children: [
                                new  TextRun({
                                    text: "UNIVERSIDAD CATÓLICA ANDRÉS BELLO – Extensión Guayana",
                                })
                            ],
                            alignment:  AlignmentType.CENTER
                        }),
                        new  Paragraph({
                            children: [
                                new  TextRun({
                                    text: "Avenida Atlántico, Ciudad Guayana 8050",
                                })
                            ],
                            alignment:  AlignmentType.CENTER
                        }),
                        new  Paragraph({
                            children: [
                                new  TextRun({
                                    text: "Bolívar, Venezuela. Teléfono: +58-286-6000111"
                                })
                            ],
                            alignment:  AlignmentType.CENTER
                        }),
                        new  Paragraph({
                            children: [
                                new  TextRun({
                                    text: "URL: http://www.guayanaweb.ucab.edu.ve/escuela-de-ingenieria-informatica.html"
                                })
                            ],
                            alignment:  AlignmentType.CENTER
                        })
                    ],
                }),
            },
            children: [
                new  Paragraph({
                    style: "aside",
                    children: [
                        new  TextRun({
                            text: Carta_designacion.fecha_designacion,
                            font: "Trebuchet MS",
                        })
                    ],
                    alignment:  AlignmentType.RIGHT,
                    spacing: {
                        after: 200,
                        line: 355,
                        lineRule:  LineRuleType.AUTO,
                    },
                }),
                new  Paragraph({
                    style: "aside",
                    children: [
                        new  TextRun({
                            text: 'Profesor(a):',
                            bold: true,
                            font: "Trebuchet MS"
                        }),
                        new  TextRun({
                            text: ' ' + Carta_designacion.propuesta.tutor_academico.apellidos + ', ' + Carta_designacion.propuesta.tutor_academico.nombres,
                            bold: true,
                            font: "Trebuchet MS"
                        }),
                    ],
                    spacing: {
                        after: 200,
                        line: 355,
                        lineRule:  LineRuleType.AUTO,
                    }
                }),    
                new  Paragraph({
                    style: "aside",
                    children: [
                        new  TextRun({
                            text: 'Me es grato dirigirme a Usted en oportunidad de informarle que en Consejo de Escuela CE No ' + Carta_designacion.CDE,
                            font: "Trebuchet MS"
                        }),
                        new  TextRun({
                            text: " Fecha: " + Carta_designacion.fecha_designacion.toLocaleDateString(),
                            bold: true,
                            font: "Trebuchet MS"
                        }),
                        new  TextRun({
                            text: ', ha sido confirmado como Tutor Académico del Trabajo Experimental de Grado: ',
                            font: "Trebuchet MS"
                        }),
                    ],
                    alignment:  AlignmentType.JUSTIFIED,
                    indent: {
                        firstLine: 400
                    },
                    spacing: {
                        after: 200,
                        line: 355,
                        lineRule:  LineRuleType.AUTO,
                    }
                }),
                new  Table({
                    columnWidths: [3505, 5505],
                    rows: generarTablaAlumno(Carta_designacion.propuesta.alumno,Carta_designacion.propuesta.titulo)
                }),
                new  Paragraph({
                    style: "aside",
                    children: [
                        new  TextRun({
                            text: "Para la realización de la tutoría se anexan los siguientes documentos: ",
                            font: "Trebuchet MS"
                        })
                    ],
                    alignment:  AlignmentType.JUSTIFIED,
                    indent: {
                        firstLine: 400
                    },
                    spacing: {
                        before: 200,
                        after: 200,
                        line: 355,
                        lineRule:  LineRuleType.AUTO,
                    }
                }),
                new  Paragraph({
                    style: "aside",
                    bullet: {
                        level: 0
                    },
                    children: [
                        new  TextRun({
                            text: "Propuesta de Trabajo de Grado aprobada ",
                            font: "Trebuchet MS"
                        })
                    ],
                    alignment:  AlignmentType.JUSTIFIED,
                    spacing: {
                        after: 50,
                        line: 355,
                        lineRule:  LineRuleType.AUTO,
                    }
                }),
                new  Paragraph({
                    style: "aside",
                    bullet: {
                        level: 0
                    },
                    children: [
                        new  TextRun({
                            text: "Guía Informe Trabajo Grado IINF Gy, donde se detalla el contenido y formato que debe tener el Informe de Trabajo Grado, el cual usted debe garantizar al emitir la Carta Culminación TG. ",
                            font: "Trebuchet MS"
                        })
                    ],
                    alignment:  AlignmentType.JUSTIFIED,
                    spacing: {
                        after: 50,
                        line: 355,
                        lineRule:  LineRuleType.AUTO,
                    }
                }),
                new  Paragraph({
                    style: "aside",
                    bullet: {
                        level: 0
                    },
                    children: [
                        new  TextRun({
                            text: "Reglamento Trabajo de Grado de la Facultad de Ingeniería, vigente y que rige lo relativo a la elaboración y presentación del Trabajo de Grado en la Facultad. ",
                            font: "Trebuchet MS"
                        })
                    ],
                    alignment:  AlignmentType.JUSTIFIED,
                    spacing: {
                        after: 50,
                        line: 355,
                        lineRule:  LineRuleType.AUTO,
                    }
                }),
                new  Paragraph({
                    style: "aside",
                    bullet: {
                        level: 0
                    },
                    children: [
                        new  TextRun({
                            text: "Modelo Carta Culminación TG Tutor Académico, en la cual el Tutor Académico, certifica que tanto el Trabajo de Grado como el Informe del mismo, están terminados y listos para su defensa. ",
                            font: "Trebuchet MS"
                        })
                    ],
                    alignment:  AlignmentType.JUSTIFIED,
                    spacing: {
                        after: 50,
                        line: 355,
                        lineRule:  LineRuleType.AUTO,
                    }
                }),
                new  Paragraph({
                    style: "aside",
                    children: [
                        new  TextRun({
                            text: "Para la entrega formal del Trabajo Experimental de Grado, usted, como Tutor Académico, debe enviar a la Escuela el informe después de revisado, junto a la Carta Culminación TG.",
                            font: "Trebuchet MS"
                        })
                    ],
                    alignment:  AlignmentType.JUSTIFIED,
                    spacing: {
                        after: 200,
                        line: 355,
                        lineRule:  LineRuleType.AUTO,
                    }
                }),
                new  Paragraph({
                    style: "aside",
                    children: [
                        new  TextRun({
                            text: "Le informo que, en el marco de la política de investigación de la Facultad de Ingeniería, se espera que este trabajo, que corresponde con un proyecto de investigación, genere un producto de publicación, bien en algunas de las revistas de la Universidad como: Guayana Sustentable, TEKHNÉ, Educab, otra de la UCAB, alguna revista nacional o Internacional del área del trabajo o en la plataforma SABER-UCAB.",
                            font: "Trebuchet MS"
                        })
                    ],
                    indent: {
                        firstLine: 400
                    },
                    spacing: {
                        after: 200,
                        line: 355,
                        lineRule:  LineRuleType.AUTO,
                    }
                }),
                new  Paragraph({
                    style: "aside",
                    children: [
                        new  TextRun({
                            text: "Para que el alumno pueda participar en el Acto de Grado de abril 2023, debe realizar la entrega formal del informe de TG con fecha tope el 14/10/2022",
                            font: "Trebuchet MS"
                        })
                    ],
                    indent: {
                        firstLine: 400
                    },
                    spacing: {
                        after: 200,
                        line: 355,
                        lineRule:  LineRuleType.AUTO,
                    }
                }),
                new  Paragraph({
                    style: "aside",
                    children: [
                        new  TextRun({
                            text: "Agradezco confirme la recepción de la presente comunicación",
                            font: "Trebuchet MS",
                            italics: true
                        })
                    ],
                    indent: {
                        firstLine: 400
                    },
                    spacing: {
                        after: 200,
                        line: 355,
                        lineRule:  LineRuleType.AUTO,
                    }
                }),
                new  Paragraph({
                    style: "aside",
                    children: [
                        new  TextRun({
                            text: "Saludandole cordialmente",
                            font: "Trebuchet MS",
                            italics: true
                        })
                    ],
                    indent: {
                        firstLine: 400
                    },
                    spacing: {
                        after: 200,
                        line: 355,
                        lineRule:  LineRuleType.AUTO,
                    }
                }),
                new  Paragraph({
                    style: "aside",
                    children: [
                        new  TextRun({
                            text: "Atentamente,",
                            font: "Trebuchet MS",
                            italics: true
                        })
                    ],
                    indent: {
                        firstLine: 400
                    },
                    spacing: {
                        after: 200,
                        line: 355,
                        lineRule:  LineRuleType.AUTO,
                    }
                }),
                new  Paragraph({
                    style: "despedida",
                    children: [
                        new  TextRun({
                            text: Carta_designacion.administrador,
                            italics: true,
                            bold: true,
                            font: "Courgette"
                        })
                    ],
                    spacing: {
                        after: 200,
                        line: 355,
                        lineRule:  LineRuleType.AUTO,
                    }
                })
            ],
        }]
    });
    const nombre_archivo = "Carta Designacion Tutor Academico"
    console.log("guardando");
    let archivo = null;
    Packer.toBlob(doc).then( blob => {
         saveAs(blob, nombre_archivo+".docx");
        //console.log("Documento creado de forma exitosa en el navegador");
    });
    /*
     Packer.toBuffer(doc).then((buffer) => {
        fs.writeFileSync("Carta Modelo Designacion Tutor Academico TEG.docx", buffer);
    });
    */
}

