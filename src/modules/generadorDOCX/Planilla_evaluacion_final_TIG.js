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
const { HorizontalPositionAlign,VerticalPositionAlign } = docx;
const { TextDirection } = docx;
const arrayPrueba = [
    {nombres: "Luis Carlos"},
]
const spacing = {
    after: 200,
    line: 255,
    lineRule: LineRuleType.AUTO,
};


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
const linea_superior = {
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
const celdaCuadrito = new TableCell({
                                children: [
                                    new Table({
                                        indent: {
                                            size: 100,
                                            type: WidthType.DXA,
                                        },
                                        //columnWidths: [300,300],
                                        rows: [
                                            new TableRow({
                                                children: [
                                                    new TableCell({
                                                        width: {
                                                            size: 150,
                                                            type: WidthType.DXA,
                                                        },
                                                        children: [
                                                            new Paragraph({
                                                                children: [
                                                                    new TextRun({
                                                                        text: ""
                                                                    })
                                                                ]
                                                            })
                                                        ],
                                                        verticalAlign: VerticalAlign.CENTER
                                                    })
                                                ],
                                                height: {
                                                    value: 150,
                                                    rule: HeightRule.EXACT
                                                }
                                            })
                                        ]
                                    })
                                ],
                                verticalAlign: VerticalAlign.CENTER
                            })
const generarFilaNotaBase20 = () => {
    const lista = [];
    let columna = 0;
    while (columna < 20){
        let columna_generada = new TableCell({
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: (columna + 1).toString()
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        }),
                                    ],
                                    width: {
                                        size: 420,
                                        type: WidthType.DXA
                                    },
                                    //textDirection: TextDirection.TOP_TO_BOTTOM_RIGHT_TO_LEFT,
                                    verticalAlign: VerticalAlign.CENTER
                                })
        lista.push(columna_generada)
        columna++;
    }
    const mensaje = new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: "Puntos en base 20"
                                        })
                                    ],
                                    style: "reducido",
                                    alignment: AlignmentType.CENTER
                                }),
                            ],
                            width: {
                                size: 600,
                                type: WidthType.DXA
                            },
                            //textDirection: TextDirection.TOP_TO_BOTTOM_RIGHT_TO_LEFT,
                            verticalAlign: VerticalAlign.CENTER
                        })
    lista.push(mensaje)
    let resultado = new TableRow({
        children: lista,
        height: {
            value: 800,
            rule: HeightRule.EXACT
        }
    });
    return resultado;
}
const generarFilasDeNotas = (ponderacion_inicial, ponderacion_final) => {
    const lista = [];
    const columna_inicial = new TableCell({
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "10"
                                                })
                                            ],
                                            style: "reducido",
                                            alignment: AlignmentType.CENTER
                                        }),
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: " - "
                                                })
                                            ],
                                            style: "reducido",
                                            alignment: AlignmentType.CENTER
                                        }),
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "22"
                                                })
                                            ],
                                            style: "reducido",
                                            alignment: AlignmentType.CENTER
                                        })
                                    ],
                                    width: {
                                        size: 420,
                                        type: WidthType.DXA
                                    },
                                    //textDirection: TextDirection.TOP_TO_BOTTOM_RIGHT_TO_LEFT,
                                    verticalAlign: VerticalAlign.CENTER
                                })
    lista.push(columna_inicial)
    while (ponderacion_final <= 300){
        let columna = new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: ponderacion_inicial.toString()
                                        })
                                    ],
                                    style: "reducido",
                                    alignment: AlignmentType.CENTER
                                }),
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: " - "
                                        })
                                    ],
                                    style: "reducido",
                                    alignment: AlignmentType.CENTER
                                }),
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: ponderacion_final.toString()
                                        })
                                    ],
                                    style: "reducido",
                                    alignment: AlignmentType.CENTER
                                })
                            ],
                            //textDirection: TextDirection.TOP_TO_BOTTOM_RIGHT_TO_LEFT,
                            verticalAlign: VerticalAlign.CENTER,
                            width: {
                                size: 420,
                                type: WidthType.DXA
                            }
                        })
        lista.push(columna);
        ponderacion_inicial = ponderacion_final + 1;
        ponderacion_final = ponderacion_inicial + 14;
    }
    const columna_final = new TableCell({
        children: [
            new Paragraph({
                children: [
                    new TextRun({
                        text: "293"
                    })
                ],
                style: "reducido",
                alignment: AlignmentType.CENTER
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: " - "
                    })
                ],
                style: "reducido",
                alignment: AlignmentType.CENTER
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: "300"
                    })
                ],
                style: "reducido",
                alignment: AlignmentType.CENTER
            }),
        ],
        //textDirection: TextDirection.TOP_TO_BOTTOM_RIGHT_TO_LEFT,
        verticalAlign: VerticalAlign.CENTER,
        width: {
            size: 420,
            type: WidthType.DXA
        }
    });
    const ponderacion = new TableCell({
        children: [
            new Paragraph({
                children: [
                    new TextRun({
                        text: "Punto en base a 300"
                    })
                ],
                style: "reducido",
                alignment: AlignmentType.CENTER
            })
        ],
        verticalAlign: VerticalAlign.CENTER,
        width: {
            size: 600,
            type: WidthType.DXA
        }
    });
    lista.push(columna_final);
    lista.push(ponderacion);
    let resultado = new TableRow({
        children: lista,
        height: {
            value: 800,
            rule: HeightRule.EXACT
        }
    });
    console.log(resultado)
    return resultado;
}

const generarFirma = () => {
    const table = new Table({
        rows: [
            new TableRow({
                children: [
                    new TableCell({
                        borders: sin_bordes,
                        children: [
                            new Table({
                                rows: [
                                    new TableRow({
                                        children: [
                                            new TableCell({
                                                borders: linea_superior,
                                                children: [
                                                    new Paragraph({
                                                        children: [
                                                            new TextRun({
                                                                text: "Fecha"
                                                            })
                                                        ],
                                                        alignment: AlignmentType.CENTER
                                                    })
                                                ],
                                                verticalAlign: VerticalAlign.CENTER,
                                                width: {
                                                    size: 2000,
                                                    type:  WidthType.DXA
                                                },
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        borders: sin_bordes,
                        children: [
                            new Table({
                                indent: {
                                    size: 250,
                                    type: WidthType.DXA,
                                },
                                rows: [
                                    new TableRow({
                                        children: [
                                            new TableCell({
                                                borders: linea_superior,
                                                children: [
                                                    new Paragraph({
                                                        children: [
                                                            new TextRun({
                                                                text: "Nombre presidente del Jurado"
                                                            })
                                                        ],
                                                        alignment: AlignmentType.CENTER
                                                    })
                                                ],
                                                verticalAlign: VerticalAlign.CENTER,
                                                width: {
                                                    size: 6000,
                                                    type:  WidthType.DXA
                                                },
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        borders: sin_bordes,
                        children: [
                            new Table({
                                indent: {
                                    size: 250,
                                    type: WidthType.DXA,
                                },
                                rows: [
                                    new TableRow({
                                        children: [
                                            new TableCell({
                                                borders: linea_superior,
                                                children: [
                                                    new Paragraph({
                                                        children: [
                                                            new TextRun({
                                                                text: "Firma"
                                                            })
                                                        ],
                                                        alignment: AlignmentType.CENTER
                                                    })
                                                ],
                                                verticalAlign: VerticalAlign.CENTER,
                                                width: {
                                                    size: 2000,
                                                    type:  WidthType.DXA
                                                },
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                ],
                height: {
                    value: 400,
                    rule: HeightRule.EXACT
                }
            })
        ]
    })
    return table;
}
const generarFilaAlumno = (alumno) => {
    const fila = new TableRow({
        children: [
            new TableCell({
                children: [
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: alumno.apellidos + ', '
                            })
                        ]
                    }),
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
                                text: ""
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
                                text: ""
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
                                text: ""
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
                                text: ""
                            })
                        ]
                    })
                ]
            }),
        ]
    })

    return fila
}
const generarTablaPonderacion = (alumno) => {
    if( alumno != undefined && alumno != null){
        const tabla = new Table({
            rows: [
                new TableRow({
                    children: [
                        new TableCell({
                            width: {
                                size: 1500,
                                type: WidthType.DXA,
                            },
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: ""
                                        })
                                    ]
                                })
                            ]
                        }),
                        new TableCell({
                            width: {
                                size: 2000,
                                type: WidthType.DXA,
                            },
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: "<<Presidente Jurado>>"
                                        })
                                    ],
                                    alignment: AlignmentType.CENTER
                                }),
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: "(TOTAL A+B1)"
                                        })
                                    ],
                                    alignment: AlignmentType.CENTER
                                }),
                            ]
                        }),
                        new TableCell({
                            width: {
                                size: 2000,
                                type: WidthType.DXA,
                            },
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: "<<Jurado 2>>"
                                        })
                                    ],
                                    alignment: AlignmentType.CENTER
                                }),
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: "(TOTAL A+B1)"
                                        })
                                    ],
                                    alignment: AlignmentType.CENTER
                                })
                            ]
                        }),
                        new TableCell({
                            width: {
                                size: 2000,
                                type: WidthType.DXA,
                            },
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: "<<Tutor>>"
                                        })
                                    ],
                                    alignment: AlignmentType.CENTER
                                }),
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: "(TOTAL A+B+C1)"
                                        })
                                    ],
                                    alignment: AlignmentType.CENTER
                                }),
                            ]
                        }),
                        new TableCell({
                            width: {
                                size: 2000,
                                type: WidthType.DXA,
                            },
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: "Total"
                                        })
                                    ],
                                    alignment: AlignmentType.CENTER
                                }),
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: "sobre 300"
                                        })
                                    ],
                                    alignment: AlignmentType.CENTER
                                }),
                            ]
                        }),
                    ]
                }),
                generarFilaAlumno(alumno)
            ]
        })
        return tabla
    }

    const tabla = new Table({
        rows: [
            new TableRow({
                children: [
                    new TableCell({
                        borders: sin_bordes,
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "Hola"
                                    })
                                ]
                            })
                        ]
                    })
                ]
            })
        ]
    })
    
}
const generarLinea = () => {
    const linea_sin_margenes = {
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
    const linea = new TableRow({
        children: [
            new TableCell({
                borders: linea_sin_margenes,
                children: [
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: ""
                            })
                        ]
                    })
                ]
            }),
            new TableCell({
                borders: linea_sin_margenes,
                children: [
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: ""
                            })
                        ]
                    })
                ]
            }),
            new TableCell({
                borders: linea_sin_margenes,
                children: [
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: ""
                            })
                        ]
                    })
                ]
            }),
        ]
    })
    return linea;
}

const generarFilaNombresAlumno = (alumno) => {
    let fila = '';
    if( alumno != undefined && alumno != null){
        console.log(alumno)
        fila = new TableRow({
            height: {
                value: 600,
                rule: HeightRule.EXACT
            },
            children: [
                new TableCell({
                    width: {
                        size: 2700,
                        type: WidthType.DXA
                    },
                    borders: {
                        right: {
                            style: BorderStyle.NONE,
                            size: 1,
                            color: "ff0000",
                        }
                    },
                    children: [
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: "Alumno: "
                                })
                            ],
                            alignment: AlignmentType.CENTER
                        }),
        
                    ],
                    verticalAlign: VerticalAlign.CENTER
                }),
                new TableCell({
                    width: {
                        size: 6300,
                        type: WidthType.DXA
                    },
                    borders: {
                        left: {
                            style: BorderStyle.NONE,
                            size: 1,
                            color: "ff0000",
                        }
                    },
                    children: [
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: alumno.apellidos + ', ' + alumno.nombres
                                })
                            ],
                            indent: {
                                firstLine: 400
                            },
                            alignment: AlignmentType.LEFT
                        })
                    ],
                    verticalAlign: VerticalAlign.CENTER
                }),
            ]
        })
        return fila;
    }
    fila = new TableRow({
                    children: [
                        new TableCell({
                            borders: sin_bordes,
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: ""
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                })
    return fila;
}
export const planilla_evaluacion_final_TIG = (notificacion) => {
    console.log(notificacion)
    const doc = new  Document({
        creator: "Luis C. Somoza & Wladimir San Vicente",
        title: "Carta de notificacion de Jurado - Dirigida a profesor jurado",
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
                    id: "titulo",
                    name: "Aside",
                    basedOn: "Normal",
                    next: "Normal",
                    run: {
                        size: 24,
                    },
                    paragraph: {
                        spacing: {
                            line: 276,
                        },
                    },
                },
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
                    id: "reducido",
                    name: "Reducido",
                    basedOn: "Normal",
                    next: "Normal",
                    run: {
                        size: 15,
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
                new Paragraph({
                    style: "titulo",
                    children: [
                        new TextRun({
                            text: "Planilla de Evaluación Final de Trabajo Experimental de Grado (TIG)",
                            bold: true
                        })
                    ],
                    spacing: {
                        after: 200
                    },
                    alignment: AlignmentType.CENTER
                }),
                new Table({
                    rows: [
                        new TableRow({
                            children: [
                                new TableCell({
                                    width: {
                                        size: 2000,
                                        type: WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "Título TIG",
                                                    bold: true
                                                })
                                            ],
                                            indent: {
                                                firstLine: 150
                                            },
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: {
                                        size: 8000,
                                        type: WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: notificacion.tg.titulo,
                                                    bold: true
                                                })
                                            ],
                                            indent: {
                                                firstLine: 400
                                            },
                                        })
                                    ]
                                }),
                            ],
                            //Height
                            height: {
                                value: 400,
                                rule: HeightRule.AUTO
                            }
                        })
                    ]
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: ""
                        })
                    ],
                    spacing: {
                        after: 100,
                        before: 100
                    }
                }),
                generarTablaPonderacion(notificacion.alumnos[0]),
                generarTablaPonderacion(notificacion.alumnos[1]),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "Nota Definitiva (base 20 según tabla anexa)"
                        })
                    ],
                    spacing: {
                        after: 300,
                        before: 100
                    }
                }),
                /*Inserte la linea de alumnos aqui */
                new Table({
                    rows: [
                        generarFilaNombresAlumno(notificacion.alumnos[0]),
                        generarFilaNombresAlumno(notificacion.alumnos[1]),
                    ]
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: ""
                        })
                    ],
                    spacing: {
                        after: 300,
                        before: 100
                    }
                }),
                new Table({
                    rows: [
                        new TableRow({
                            children: [
                                new TableCell({
                                    borders: {
                                        left: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                        top: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",   
                                        }
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "Mención Honorífica Justificación:"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ],
                                    width: {
                                        size: 3500,
                                        type: WidthType.DXA
                                    }
                                }),
                                new TableCell({
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: ""
                                                })
                                            ]
                                        })
                                    ],
                                    width: {
                                        size: 2000,
                                        type: WidthType.DXA
                                    }
                                }),
                                new TableCell({
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "Nota 19 ó 20 y acuerdo unánime del jurado"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ],
                                    borders: {
                                        right: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                        top: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",   
                                        }
                                    },
                                    width: {
                                        size: 3500,
                                        type: WidthType.DXA
                                    }
                                }),
                            ]
                        }),
                        generarLinea(),
                        generarLinea(),
                        generarLinea(),
                        generarLinea(),
                        //Espacio

                    ]
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: " "
                        })
                    ],
                    spacing: {
                        after: 200,
                        before: 200
                    }
                }),
                new Table({
                    rows: [
                        new TableRow({
                            children: [
                                new TableCell({
                                    borders: {
                                        left: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                        top: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",   
                                        }
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "Mención Publicación Justificación:"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ],
                                    width: {
                                        size: 3500,
                                        type: WidthType.DXA
                                    }
                                }),
                                new TableCell({
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: ""
                                                })
                                            ]
                                        })
                                    ],
                                    width: {
                                        size: 2000,
                                        type: WidthType.DXA
                                    }
                                }),
                                new TableCell({
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "Nota 20 y acuerdo unánime del jurado"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ],
                                    borders: {
                                        right: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                        top: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",   
                                        }
                                    },
                                    width: {
                                        size: 3500,
                                        type: WidthType.DXA
                                    }
                                }),
                            ]
                        }),
                        generarLinea(),
                        generarLinea(),
                        generarLinea(),
                        generarLinea(),
                        //Espacio

                    ]
                }),
                //Insertar tabla de ponderacion
                new Paragraph({
                    children: [
                        new TextRun({
                            text: ""
                        })
                    ],
                    spacing: {
                        after: 200,
                        before: 200
                    }
                }),
                new Table({
                    columnWidths: [200,400],
                    rows:[
                        generarFilasDeNotas(23,37),
                        generarFilaNotaBase20(),
                        new TableRow({
                            children: [
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                                new TableCell({
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: ""
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ],
                            height: {
                                value: 300,
                                rule: HeightRule.EXACT
                            }
                        })

                    ]
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: ""
                        })
                    ],
                    spacing: {
                        after: 600,
                        before: 200
                    }
                }),
                generarFirma()
            ]
        }]
    });
    const nombre_archivo = "Planilla de evaluacion final (TIG)"
    let archivo = null;
    Packer.toBlob(doc).then( blob => {
         saveAs(blob, nombre_archivo+".docx");
        //console.log("Documento creado de forma exitosa en el navegador");
    });
}

