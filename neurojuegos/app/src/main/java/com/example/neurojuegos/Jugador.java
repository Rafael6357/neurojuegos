package com.example.neurojuegos;


public class Jugador {
    private String nombre;
    private int edad;
    private int puntuacion;

    public Jugador(String nombre, int puntuacionGeneral) {
        this.nombre = nombre;
        this.puntuacion = puntuacionGeneral;
    }

    public String getNombre() {
        return nombre;
    }

    public int getEdad() {
        return edad;
    }

    public int getPuntuacion() {
        return puntuacion;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setEdad(int edad) {
        this.edad = edad;
    }

    public void setPuntuacion(int puntuacion) {
        this.puntuacion = puntuacion;
    }
}