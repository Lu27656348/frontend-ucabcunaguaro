import * as docx from 'docx';
import file_saver from 'file-saver'
const { saveAs } = file_saver
// Load the full build.
import lodash from 'lodash';
const { _ } = lodash;
const { TableRow, BorderStyle } = docx;
const { WidthType, Paragraph } = docx;
const { VerticalAlign, Document } = docx;
const { TextRun, AlignmentType } = docx;
const { SectionType, Header } = docx;
const { HeightRule, TableCell } = docx;
const { Footer, LineRuleType } = docx;
const { Table, PageBreak } = docx;
const { HeadingLevel, Packer } = docx;
//const { TableRow,BorderStyle } = docx;
const sin_bordes = {
    top: {
        style: BorderStyle.NONE,
        size: 1,
        color: "ff0000",
    },
    bottom: {
        style: BorderStyle.NONE,
        size: 1,
        color: "ff0000",
    },
    left: {
        style: BorderStyle.NONE,
        size: 1,
        color: "ff0000",
    },
    right: {
        style: BorderStyle.NONE,
        size: 1,
        color: "ff0000",
    }
}
const linea = {
    top: {
        style: BorderStyle.NONE,
        size: 1,
        color: "ff0000",
    },
    left: {
        style: BorderStyle.NONE,
        size: 1,
        color: "ff0000",
    },
    right: {
        style: BorderStyle.NONE,
        size: 1,
        color: "ff0000",
    }
}
const generarCriterio = (text) => {
    return (new  TableRow({
                    height: {
                        value: 900,
                        rule:  HeightRule.AUTO
                    },
                    children: [
                        new  TableCell({
                            children: [
                                new  Paragraph({
                                    children: [
                                        new  TextRun({
                                            text: text
                                        })
                                    ],
                                })
                            ],
                            width: {
                                size: 5000,
                                type:  WidthType.DXA
                            }
                        }),
                        new  TableCell({
                            children: [
                                new  Paragraph({
                                    children: [
                                        new  TextRun({
                                            text: ""
                                        })
                                    ],
                                })
                            ],
                            width: {
                                size: 1000,
                                type:  WidthType.DXA
                            }
                        }),
                        new  TableCell({
                            children: [
                                new  Paragraph({
                                    children: [
                                        new  TextRun({
                                            text: ""
                                        })
                                    ],
                                })
                            ],
                            width: {
                                size: 1000,
                                type:  WidthType.DXA
                            }
                        }),

                    ]
                }));
}
const generarDatosAlumno = (alumno)  => {
    const datos = new TableRow({
        children: [
            new TableCell({
                children: [
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: alumno.nombres
                            })
                        ]
                    })
                ]
            }),
            new TableCell({
                children: [
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: alumno.cedula
                            })
                        ]
                    })
                ]
            }),
            new TableCell({
                children: [
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: alumno.telefono
                            })
                        ]
                    })
                ]
            }),
            new TableCell({
                children: [
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: alumno.email
                            })
                        ]
                    })
                ]
            }),
        ]
    })
    return datos
}
const Carta_designacion = {
    propuesta: {
        titulo: '',
        modalidad: '',
        alumnno: [{
            cedula: '',
            nombres: '',
            apellidos: ''
        }],
        tutor_empresarial: {
            nombres: '',
            apellidos: '',
            cedula: ''
        },
        tutor: ''
    },
    fecha_designacion: '',
    CDE: '',
    administrador: '',
    empresa: '',

}

export const generarPE_revisor_tig = (Carta_designacion) => {
    console.log("generarPE_revisor_tig");
    console.log(Carta_designacion);
    let experiencia;
    let fecha_graduado;
    if(Carta_designacion.propuesta.tutor_academico.experiencia == null || Carta_designacion.propuesta.tutor_academico.experiencia == undefined){
        experiencia = "No tiene experiencia";
    }else{
        experiencia = Carta_designacion.propuesta.tutor_academico.experiencia 
    }
    const doc = new  Document({
        creator: "Luis C. Somoza & Wladimir SanVicente",
        title: "Planilla de evaluaciòn de revisor de TIG",
        description: "Planilla de evaluaciòn de revisor de TIG",
        styles: {
            default: {
                heading1: {
                    run: {
                        size: 23,
                        bold: true,
                    },
                    paragraph: {
                        spacing: {
                            after: 200,
                        },
                        alignment:  AlignmentType.CENTER,
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
                            line: 200,
                        },
                    },
                }
            ]
        },
        sections: [{
            properties: {
                type:  SectionType.CONTINUOUS,
                margin: {
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
                        text: "Evaluación Propuesta Trabajo Experimental de Grado (TIG)",
                        bold: true
                    })
                ],
                alignment:  AlignmentType.CENTER,
                spacing: {
                    after: 200
                }
               }),
               new  Paragraph({
                style: "aside",
                children: [
                    new  TextRun({
                        text: "Tema propuesto: ",
                        bold: true
                    })
                ],
                spacing: {
                    after: 100
                }
               }),
                new  Table({
                    rows: [
                        new  TableRow({
                            height: {
                                value: 500,
                                rule:  HeightRule.EXACT
                            },
                            children: [
                                new  TableCell({
                                    children: [
                                        new  Paragraph({
                                            children: [
                                                new  TextRun({
                                                    text: Carta_designacion.propuesta.titulo
                                                })
                                            ],
                                        })
                                    ],
                                    width: {
                                        size: 10000,
                                        type:  WidthType.DXA
                                    }
                                })
                            ]
                        }),
                    ]
                }),
            //FIN DE TABLA
            new  Paragraph({
                children: [
                    new  TextRun({
                        text: "Organización donde desarrollará el TIG: ",
                        bold: true
                    })
                ],
                spacing: {
                    after: 200
                }
            }),
            new  Table({
                rows: [
                    new  TableRow({
                        height: {
                            value: 500,
                            rule:  HeightRule.EXACT
                        },
                        children: [
                            new  TableCell({
                                children: [
                                    new  Paragraph({
                                        children: [
                                            new  TextRun({
                                                text: Carta_designacion.organizacion
                                            })
                                        ],
                                    })
                                ],
                                width: {
                                    size: 10000,
                                    type:  WidthType.DXA
                                }
                            })
                        ]
                    })
                ]
            }),
            new  Paragraph({
                children: [
                    new  TextRun({
                        text: "Criterios de evaluación: ",
                        bold: true
                    })
                ],
                spacing: {
                    after: 200
                }
            }),
            //Tabla de criterios
            new  Table({
                indent: {
                    size: 500,
                    type:  WidthType.DXA
                },
                rows: [
                    new  TableRow({
                        height: {
                            value: 300,
                            rule:  HeightRule.EXACT
                        },
                        children: [
                            new  TableCell({
                                verticalAlign:  VerticalAlign.CENTER,
                                children: [
                                    new  Paragraph({
                                        children: [
                                            new  TextRun({
                                                text: "Criterios",
                                                bold: true
                                            })
                                        ],
                                        alignment:  AlignmentType.CENTER
                                    })
                                ],
                                width: {
                                    size: 5000,
                                    type:  WidthType.DXA
                                }
                            }),
                            new  TableCell({
                                verticalAlign:  VerticalAlign.CENTER,
                                children: [
                                    new  Paragraph({
                                        children: [
                                            new  TextRun({
                                                text: "Aprobado",
                                                bold: true
                                            })
                                        ],
                                        alignment:  AlignmentType.CENTER
                                    })
                                ],
                                width: {
                                    size: 1500,
                                    type:  WidthType.DXA
                                }
                            }),
                            new  TableCell({
                                verticalAlign:  VerticalAlign.CENTER,
                                children: [
                                    new  Paragraph({
                                        children: [
                                            new  TextRun({
                                                text: "Reprobado",
                                                bold: true
                                            })
                                        ],
                                        alignment:  AlignmentType.CENTER
                                    })
                                ],
                                width: {
                                    size: 1500,
                                    type:  WidthType.DXA
                                }
                            }),
                        ]
                    }),
                    generarCriterio("El tema planteado tiene estrecha relación con Ingeniería Informática."),
                    generarCriterio("Los objetivos planteados son claros y medibles."),
                    generarCriterio("Existe una clara justificación para el desarrollo del proyecto, en función de aporte profesional"),
                    generarCriterio("El proyecto es factible de realizarse en mínimo 20 semanas y máximo un año, a tiempo completo"),
                    generarCriterio("Realiza recomendaciones tecnológicas (hardware, software, comunicación) justificada con base en los requerimientos técnicos no funcionales identificados, garantizando un desempeño eficiente"),
                    generarCriterio("Define o rediseña el o los procesos involucrados, identificando los aspectos de mejora y justificando los mismos con base en los requerimientos funcionales identificados."),
                ]
            }),
            new  Paragraph({
                children: [
                    new  TextRun({
                        text: "Observación:",
                        bold: true
                    }),
                    new  TextRun({
                        text: "En caso de reprobar algún criterio, la propuesta estaría rechazada. Indicar al final la razón de rechazo."
                    }),
                ],
                spacing: {
                    after: 100
                }
            }),
            new  Paragraph({
                children: [
                    new  TextRun({
                        text: "Datos del Estudiante:",
                        bold: true
                    }),
                ],
                spacing: {
                    after: 100,
                    before: 100
                }
            }),
            new  Table({
                columnWidths: [3000, 4500],
                rows: [
                    new  TableRow({
                        height: {
                            value: 300, 
                            rule:  HeightRule.EXACT
                        },
                        children: [
                            new  TableCell({
                                width: {
                                    size: 2700,
                                    type:  WidthType.DXA
                                },
                                children: [
                                    new  Paragraph({
                                        style: "aside",
                                        children: [
                                            new  TextRun({
                                                text: "Nombre",
                                                bold: true
                                            }),
                                        ],
                                        alignment:  AlignmentType.CENTER,
                                    })
                                ],
                                verticalAlign:  VerticalAlign.CENTER,
                            }),
                            new  TableCell({
                                width: {
                                    size: 2000,
                                    type:  WidthType.DXA
                                },
                                children: [
                                    new  Paragraph({
                                        style: "aside",
                                        children: [
                                            new  TextRun({
                                                text: "C.I.N",
                                                bold: true
                                            }),
                                        ],
                                        alignment:  AlignmentType.CENTER,
                                    })
                                ],
                                verticalAlign:  VerticalAlign.CENTER,
                            }),
                            new  TableCell({
                                width: {
                                    size: 2400,
                                    type:  WidthType.DXA
                                },
                                children: [
                                    new  Paragraph({
                                        style: "aside",
                                        children: [
                                            new  TextRun({
                                                text: "Telefono",
                                                bold: true
                                            }),
                                        ],
                                        alignment:  AlignmentType.CENTER,
                                    })
                                ],
                                verticalAlign:  VerticalAlign.CENTER,
                            }),
                            new  TableCell({
                                width: {
                                    size: 2700,
                                    type:  WidthType.DXA
                                },
                                children: [
                                    new  Paragraph({
                                        style: "aside",
                                        children: [
                                            new  TextRun({
                                                text: "Email",
                                                bold: true
                                            }),
                                        ],
                                        alignment:  AlignmentType.CENTER,
                                    })
                                ],
                                verticalAlign:  VerticalAlign.CENTER,
                            }),
                        ]
                    }),
                    generarDatosAlumno(Carta_designacion.propuesta.alumno[0])
                
                ],
            }),
            new  Paragraph({
                children: [
                    new  TextRun({
                        text: "Datos del Tutor Académico:",
                        bold: true
                    })
                ],
                spacing: {
                    after: 100,
                    before:100
                }
            }),
            //Datos del tutor academico
            new  Table({
                columnWidths: [3000, 4500],
                rows: [
                    new  TableRow({
                        height: {
                            value: 400, 
                            rule:  HeightRule.EXACT
                        },
                        children : [
                            new  TableCell({
                                borders: sin_bordes,
                                children: [
                                    new  Paragraph({
                                        style: "aside",
                                        children: [
                                            new  TextRun({
                                                text: "Nombre",
                                            })
                                        ],
                                        alignment:  AlignmentType.CENTER
                                    })
                                ],
                                verticalAlign:  VerticalAlign.CENTER,
                            }),
                            new  TableCell({
                                borders: linea,
                                children: [
                                    new  Paragraph({
                                        style: "aside",
                                        children: [
                                            new  TextRun({
                                                text: Carta_designacion.propuesta.tutor_academico.apellidos + ', ' + Carta_designacion.propuesta.tutor_academico.nombres,
                                            })
                                        ],
                                    })
                                ],
                            })
                        ]
                    }),
                    new  TableRow({
                        height: {
                            value: 400, 
                            rule:  HeightRule.EXACT
                        },
                        children : [
                            new  TableCell({
                                borders: sin_bordes,
                                children: [
                                    new  Paragraph({
                                        style: "aside",
                                        children: [
                                            new  TextRun({
                                                text: "C.I.N",
                                            })
                                        ],
                                        alignment:  AlignmentType.CENTER
                                    })
                                ],
                                verticalAlign:  VerticalAlign.CENTER,
                            }),
                            new  TableCell({
                                borders: linea,
                                children: [
                                    new  Paragraph({
                                        children: [
                                            new  TextRun({
                                                text: Carta_designacion.propuesta.tutor_academico.cedula,
                                            })
                                        ],
                                    })
                                ],
                            })
                        ]
                    }),
                    new  TableRow({
                        height: {
                            value: 400, 
                            rule:  HeightRule.EXACT
                        },
                        children : [
                            new  TableCell({
                                borders: sin_bordes,
                                children: [
                                    new  Paragraph({
                                        style: "aside",
                                        children: [
                                            new  TextRun({
                                                text: "Profesion",
                                            })
                                        ],
                                        alignment:  AlignmentType.CENTER
                                    })
                                ],
                                verticalAlign:  VerticalAlign.CENTER,
                            }),
                            new  TableCell({
                                borders: linea,
                                children: [
                                    new  Paragraph({
                                        children: [
                                            new  TextRun({
                                                text: Carta_designacion.propuesta.tutor_academico.cargo,
                                            })
                                        ],
                                    })
                                ],
                                width: {
                                    size: 10000,
                                    type:  WidthType.DXA
                                },
                            })
                        ]
                    }),
                    new  TableRow({
                        height: {
                            value: 400, 
                            rule:  HeightRule.EXACT
                        },
                        children : [
                            new  TableCell({
                                borders: sin_bordes,
                                children: [
                                    new  Paragraph({
                                        style: "aside",
                                        children: [
                                            new  TextRun({
                                                text: "Años de experiencia",
                                            })
                                        ],
                                        alignment:  AlignmentType.CENTER
                                    })
                                ],
                                verticalAlign:  VerticalAlign.CENTER,
                            }),
                            new  TableCell({
                                borders: linea,
                                children: [
                                    new  Paragraph({
                                        children: [
                                            new  TextRun({
                                                text: experiencia.toString(),
                                            })
                                        ],
                                        
                                    })
                                ],
                                width: {
                                    size: 10000,
                                    type:  WidthType.DXA
                                },
                            }),
                        ]
                    }),
                    new  TableRow({
                        height: {
                            value: 400, 
                            rule:  HeightRule.EXACT
                        },
                        children : [
                            new  TableCell({
                                borders: sin_bordes,
                                children: [
                                    new  Paragraph({
                                        style: "aside",
                                        children: [
                                            new  TextRun({
                                                text: "Cargo Actual",
                                            })
                                        ],
                                        alignment:  AlignmentType.CENTER
                                    })
                                ],
                                verticalAlign:  VerticalAlign.CENTER,
                            }),
                            new  TableCell({
                                borders: linea,
                                children: [
                                    new  Paragraph({
                                        style: "aside",
                                        children: [
                                            new  TextRun({
                                                text: Carta_designacion.propuesta.tutor_academico.cargo,
                                            })
                                        ],
                                    })
                                ],
                                width: {
                                    size: 10000,
                                    type:  WidthType.DXA
                                },
                            })
                        ]
                    }),
                    new  TableRow({
                        height: {
                            value: 400, 
                            rule:  HeightRule.EXACT
                        },
                        children : [
                            new  TableCell({
                                borders: sin_bordes,
                                children: [
                                    new  Paragraph({
                                        style: "aside",
                                        children: [
                                            new  TextRun({
                                                text: "Email",
                                            })
                                        ],
                                        alignment:  AlignmentType.CENTER
                                    })
                                ],
                                verticalAlign:  VerticalAlign.CENTER,
                            }),
                            new  TableCell({
                                borders: linea,
                                children: [
                                    new  Paragraph({
                                        style: "aside",
                                        children: [
                                            new  TextRun({
                                                text: Carta_designacion.propuesta.tutor_academico.email,
                                            })
                                        ],
                                    })
                                ],
                                width: {
                                    size: 10000,
                                    type:  WidthType.DXA
                                },
                            })
                        ]
                    }),
                    new  TableRow({
                        height: {
                            value: 400, 
                            rule:  HeightRule.EXACT
                        },
                        children : [
                            new  TableCell({
                                borders: sin_bordes,
                                children: [
                                    new  Paragraph({
                                        style: "aside",
                                        children: [
                                            new  TextRun({
                                                text: "Telefono",
                                            })
                                        ],
                                        alignment:  AlignmentType.CENTER
                                    })
                                ],
                                verticalAlign:  VerticalAlign.CENTER,
                            }),
                            new  TableCell({
                                borders: linea,
                                children: [
                                    new  Paragraph({
                                        style: "aside",
                                        children: [
                                            new  TextRun({
                                                text: Carta_designacion.propuesta.tutor_academico.telefono,
                                            })
                                        ],
                                    })
                                ],
                                width: {
                                    size: 10000,
                                    type:  WidthType.DXA
                                },
                            })
                        ]
                    }),
                ]
            }),
            new  Paragraph({
                children: [
                    new  TextRun({
                        text: "Para ser llenado por el revisor:",
                        bold: true
                    })
                ],
                spacing: {
                    before: 100,
                    after: 100
                }
            }),
            new  Table({
                width: {
                    size: 9000,
                    type:  WidthType.DXA
                },
                rows: [
                    new  TableRow({
                        children: [
                            new  TableCell({
                                borders: {
                                    top: {
                                        size: 1,
                                        color: "#ffffff",
                                        style:  BorderStyle.NONE
                                    },
                                    bottom: {
                                        size: 1,
                                        color: "#ffffff",
                                        style:  BorderStyle.NONE
                                    },
                                    right:{
                                        size: 1,
                                        color: "#ffffff",
                                        style:  BorderStyle.NONE
                                    },
                                    left: {
                                        size: 1,
                                        color: "#ffffff",
                                        style:  BorderStyle.NONE
                                    }
                                },
                                children: [
                                    new  Paragraph({
                                        children: [
                                            new  TextRun({
                                                text: "Apellidos, Nombres: "
                                            })
                                        ],
                                        alignment:  AlignmentType.LEFT
                                    })
                                ],
                                width: {
                                    size: 2000,
                                    type:  WidthType.DXA
                                },
                            }),
                            new  TableCell({
                                borders: {
                                    top: {
                                        size: 1,
                                        color: "#ffffff",
                                        style:  BorderStyle.NONE
                                    },
                                    bottom: {
                                        size: 1,
                                        color: "#ffffff",
                                        style:  BorderStyle.NONE
                                    },
                                    right:{
                                        size: 1,
                                        color: "#ffffff",
                                        style:  BorderStyle.NONE
                                    },
                                    left: {
                                        size: 1,
                                        color: "#ffffff",
                                        style:  BorderStyle.NONE
                                    }
                                },
                                children: [
                                    new  Paragraph({
                                        children: [
                                            new  TextRun({
                                                text: "Lárez Mata, Jesús José"
                                            })
                                        ],
                                        alignment:  AlignmentType.LEFT
                                    })
                                ],
                                width: {
                                    size: 2000,
                                    type:  WidthType.DXA
                                },
                            }),
                            new  TableCell({
                                borders: {
                                    top: {
                                        size: 1,
                                        color: "#ffffff",
                                        style:  BorderStyle.NONE
                                    },
                                    bottom: {
                                        size: 1,
                                        color: "#ffffff",
                                        style:  BorderStyle.NONE
                                    },
                                    right:{
                                        size: 1,
                                        color: "#ffffff",
                                        style:  BorderStyle.NONE
                                    },
                                    left: {
                                        size: 1,
                                        color: "#ffffff",
                                        style:  BorderStyle.NONE
                                    }
                                },
                                children: [
                                    new  Paragraph({
                                        children: [
                                            new  TextRun({
                                                text: ""
                                            })
                                        ],
                                        alignment:  AlignmentType.LEFT
                                    })
                                ],
                                
                            }),
                            
                        ]
                    }),
                    new  TableRow({
                        children: [
                            new  TableCell({
                                borders: {
                                    top: {
                                        size: 1,
                                        color: "#ffffff",
                                        style:  BorderStyle.NONE
                                    },
                                    bottom: {
                                        size: 1,
                                        color: "#ffffff",
                                        style:  BorderStyle.NONE
                                    },
                                    right:{
                                        size: 1,
                                        color: "#ffffff",
                                        style:  BorderStyle.NONE
                                    },
                                    left: {
                                        size: 1,
                                        color: "#ffffff",
                                        style:  BorderStyle.NONE
                                    }
                                },
                                children: [
                                    new  Paragraph({
                                        children: [
                                            new  TextRun({
                                                text: "Decisión Final: "
                                            })
                                        ]
                                    })
                                ]
                            }),
                            new  TableCell({
                                borders: {
                                    top: {
                                        size: 1,
                                        color: "#ffffff",
                                        style:  BorderStyle.NONE
                                    },
                                    bottom: {
                                        size: 1,
                                        color: "#ffffff",
                                        style:  BorderStyle.NONE
                                    },
                                    right:{
                                        size: 1,
                                        color: "#ffffff",
                                        style:  BorderStyle.NONE
                                    },
                                    left: {
                                        size: 1,
                                        color: "#ffffff",
                                        style:  BorderStyle.NONE
                                    }
                                },
                                children: [
                                    new  Paragraph({
                                        children: [
                                            new  TextRun({
                                                text: "Aprobado: "
                                            })
                                        ]
                                    })
                                ],
                                width: {
                                    size: 1500,
                                    type:  WidthType.DXA
                                },
                            }),
                            new  TableCell({
                                borders: {
                                    top: {
                                        size: 1,
                                        color: "#ffffff",
                                        style:  BorderStyle.NONE
                                    },
                                    bottom: {
                                        size: 1,
                                        color: "#ffffff",
                                        style:  BorderStyle.NONE
                                    },
                                    right:{
                                        size: 1,
                                        color: "#ffffff",
                                        style:  BorderStyle.NONE
                                    },
                                    left: {
                                        size: 1,
                                        color: "#ffffff",
                                        style:  BorderStyle.NONE
                                    }
                                },
                                children: [
                                    new  Paragraph({
                                        children: [
                                            new  TextRun({
                                                text: "Reprobada:"
                                            })
                                        ]
                                    })
                                ],
                                width: {
                                    size: 1500,
                                    type:  WidthType.DXA
                                },
                            }),
                            new  TableCell({
                                borders: {
                                    top: {
                                        size: 1,
                                        color: "#ffffff",
                                        style:  BorderStyle.NONE
                                    },
                                    bottom: {
                                        size: 1,
                                        color: "#ffffff",
                                        style:  BorderStyle.NONE
                                    },
                                    right:{
                                        size: 1,
                                        color: "#ffffff",
                                        style:  BorderStyle.NONE
                                    },
                                    left: {
                                        size: 1,
                                        color: "#ffffff",
                                        style:  BorderStyle.NONE
                                    }
                                },
                                children: [
                                    new  Paragraph({
                                        children: [
                                            new  TextRun({
                                                text: "Fecha: "
                                            })
                                        ],
                                        alignment:  AlignmentType.RIGHT
                                    })
                                ],
                                width: {
                                    size: 2000,
                                    type:  WidthType.DXA
                                },
                            }),
                            new  TableCell({
                                borders: {
                                    top: {
                                        size: 1,
                                        color: "#ffffff",
                                        style:  BorderStyle.NONE
                                    },
                                    bottom: {
                                        size: 1,
                                        color: "#ffffff",
                                        style:  BorderStyle.NONE
                                    },
                                    right:{
                                        size: 1,
                                        color: "#ffffff",
                                        style:  BorderStyle.NONE
                                    },
                                    left: {
                                        size: 1,
                                        color: "#ffffff",
                                        style:  BorderStyle.NONE
                                    }
                                },
                                children: [
                                    new  Paragraph({
                                        children: [
                                            new  TextRun({
                                                text: " "
                                            })
                                        ]
                                    })
                                ]
                            }),
                        ]
                    }),
                ]
            }),
            new  Paragraph({
                children: [
                    new  TextRun({
                        text: "Observaciones (solo en caso de ser rechazado el documento):"
                    })
                ],
                spacing: {
                    before: 10,
                    after: 10
                }
            }),
            new  Paragraph({
                children: [
                    new  TextRun({
                        text: ""
                    })
                ],
                spacing: {
                    after: 350
                }
            }),
            new  Table({
                indent: {
                    size: 3000,
                    type:  WidthType.DXA
                },
                rows: [
                    new  TableRow({
                        height: {
                            value: 300,
                            rule:  HeightRule.EXACT
                        },
                        children: [
                            new  TableCell({
                                borders: {
                                    left: {
                                        size: 1,
                                        color: "#FFFFFF",
                                        style:  BorderStyle.NONE
                                    },
                                    right: {
                                        size: 1,
                                        color: "#FFFFFF",
                                        style:  BorderStyle.NONE
                                    },
                                    bottom: {
                                        size: 1,
                                        color: "#FFFFFF",
                                        style:  BorderStyle.NONE
                                    }
                                },
                                children: [
                                    new  Paragraph({
                                        children: [
                                            new  TextRun("Firma Revisor")
                                        ],
                                        alignment:  AlignmentType.CENTER
                                    }),
                                ],
                                verticalAlign:  VerticalAlign.CENTER,
                                width: {
                                    size: 3000,
                                    type:  WidthType.DXA
                                }
                            }),
                        ],
                    }),
                ]
            }),
    
    
            ],
        }],
    });
    const nombre_archivo = "Planilla revisor TIG"
    Packer.toBlob(doc).then(blob => {
        saveAs(blob, nombre_archivo + ".docx");
        //console.log("Documento creado de forma exitosa en el navegador");
    });
    /*
     Packer.toBuffer(doc).then((buffer) => {
        fs.writeFileSync("Evaluaciòn Propuesta TIG - Revisor.docx", buffer);
    });
    */
}

