package com.example.neurojuegos;

import androidx.appcompat.app.AppCompatActivity;

import android.app.AlertDialog;
import android.app.Dialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;

public class AjustesActivity extends AppCompatActivity {

    private ImageView boton_ranking,button_panel_inicio,menu_panel;
    private AdminSQLiteOpenHelper BaseDeDatos;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_ajustes);

        menu_panel = findViewById(R.id.menu_panel);

        // Configurar el botón para mostrar el menu panel
        menu_panel.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(AjustesActivity.this, Panel_Minijuegos.class);
                startActivity(intent);
            }
        });

        button_panel_inicio = findViewById(R.id.button_panel_inicio);

        // Configurar el botón para mostrar el panel de niveles
        button_panel_inicio.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(AjustesActivity.this, Inicio_Activity.class);
                startActivity(intent);
            }
        });

        boton_ranking = findViewById(R.id.boton_ranking);
        boton_ranking.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mostrarRanking();
            }
        });

        // Configura el listener de clics para el botón de Volumen
        Button btnVolumen = findViewById(R.id.btn_volumen);
        btnVolumen.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Realiza la acción deseada cuando se hace clic en el botón de Volumen
                // Por ejemplo, muestra un Toast con un mensaje
                Toast.makeText(AjustesActivity.this, "Volumen", Toast.LENGTH_SHORT).show();
            }
        });

        Button btnAcercaDe = findViewById(R.id.btn_acerca_de);
        btnAcercaDe.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                showAcercaDeDialog();
            }

            private void showAcercaDeDialog() {
                AlertDialog.Builder builder = new AlertDialog.Builder(AjustesActivity.this);
                builder.setTitle("Acerca de:");
                builder.setMessage("Nombre de la Aplicación: NeuroJuegos\n" +
                        "\n" +
                        "Descripción de la Aplicación:Está diseñada para ayudar a los niños de 0 a 6 años con trastornos en el lenguaje y la memoria a desarrollar sus habilidades de comunicación y memoria de una manera divertida y educativa. La aplicación incluye una variedad de juegos y actividades diseñados para mejorar la comprensión del lenguaje, la memoria, la asociación y la atención de los niños. Los juegos son interactivos y visuales para mantener a los niños comprometidos y motivados.\n" +
                        "\n" +
                        "Principales Características:\n" +
                        "\n" +
                        "Variedad de juegos y actividades diseñados para mejorar la comprensión del lenguaje, la memoria, la asociación y la atención de los niños.\n" +
                        "Juegos interactivos y visuales para mantener a los niños comprometidos y motivados.\n" +
                        "Mejora la capacidad de los niños para comunicarse y recordar información importante en situaciones cotidianas.\n" +
                        "Beneficios de la aplicación:\n" +
                        "\n" +
                        "Ayuda a los niños con trastornos en el lenguaje y la memoria a superar sus desafíos y mejorar sus habilidades de comunicación y memoria.\n" +
                        "Mejora la calidad de vida de los niños y sus familias.\n" +
                        "Facilita la interacción social y la comunicación de los niños.\n" +
                        "Relevancia de la aplicación para niños con trastornos en el lenguaje y la memoria:\n" +
                        "\n" +
                        "Ha sido diseñada específicamente para ayudar a los niños con trastornos en el lenguaje y la memoria a superar sus desafíos y mejorar sus habilidades de comunicación y memoria.\n" +
                        "La aplicación es una herramienta efectiva para la terapia del lenguaje y la memoria de los niños.\n" +
                        "Información sobre los desarrolladores de la aplicación:\n" +
                        "\n" +
                        "NeuroJuegos ha sido desarrollada por Rafael Nicolas Espinosa Rodríguez\n" +
                        " La aplicación incluye una variedad de juegos y actividades diseñados para mejorar la comprensión del lenguaje," +
                        " la memoria, la asociación y la atención de los niños. " +
                        "Los juegos son interactivos y visuales para mantener a los niños comprometidos y motivados.");

                builder.setPositiveButton("Cerrar", new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int id) {
                        dialog.dismiss();
                    }
                });

                AlertDialog dialog = builder.create();
                dialog.show();
            }
        });
    }

    // Este método se llamará cuando el usuario presione el botón "Atrás" en la barra de acción o en el dispositivo
    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if (item.getItemId() == android.R.id.home) {
            finish(); // Cierra la actividad y vuelve a la actividad anterior
            return true;
        }
        return super.onOptionsItemSelected(item);
    }

    private void mostrarRanking() {
        // Obtener el ranking de jugadores de mayor a menor puntuación
        ArrayList<Jugador> jugadores = obtenerRanking();

        // Crear un StringBuilder para construir el mensaje del AlertDialog
        StringBuilder mensaje = new StringBuilder();
        mensaje.append("");
        for (int i = 0; i < jugadores.size(); i++) {
            Jugador jugador = jugadores.get(i);
            mensaje.append(i + 1).append(". ").append(jugador.getNombre()).append(" - ").append(jugador.getPuntuacion()).append("\n");
        }

        // Mostrar el AlertDialog con el ranking
        androidx.appcompat.app.AlertDialog.Builder builder = new androidx.appcompat.app.AlertDialog.Builder(this);
        builder.setTitle("Ranking De Jugadores");
        builder.setMessage(mensaje.toString());
        builder.setPositiveButton("Aceptar", null);
        builder.show();
    }

    private ArrayList<Jugador> obtenerRanking() {
        // Obtener los jugadores registrados en la base de datos
        BaseDeDatos = new AdminSQLiteOpenHelper(AjustesActivity.this, "administracion", null, 2);
        SQLiteDatabase db = BaseDeDatos.getReadableDatabase();
        Cursor cursor = db.rawQuery("SELECT nombre, puntuacionFrasesVoF, puntuacionIdentifica, puntuacionPatrones, puntuacionCadenaNum, puntuacionPalabrasEncad, puntuacionMemo FROM datos", null);

        // Crear una lista de objetos Jugador
        ArrayList<Jugador> jugadores = new ArrayList<>();
        if (cursor.moveToFirst()) {
            do {
                String nombre = cursor.getString(0);
                int puntuacionFrasesVoF = cursor.getInt(1);
                int puntuacionIdentifica = cursor.getInt(2);
                int puntuacionPatrones = cursor.getInt(3);
                int puntuacionCadenaNum = cursor.getInt(4);
                int puntuacionPalabrasEncad = cursor.getInt(5);
                int puntuacionMemo = cursor.getInt(6);
                int puntuacionGeneral = puntuacionFrasesVoF + puntuacionIdentifica + puntuacionPatrones + puntuacionCadenaNum + puntuacionPalabrasEncad + puntuacionMemo;
                Jugador jugador = new Jugador(nombre, puntuacionGeneral);
                jugadores.add(jugador);
            } while (cursor.moveToNext());
        }

        // Ordenar los jugadores por puntuación de mayor a menor
        Collections.sort(jugadores, new Comparator<Jugador>() {
            @Override
            public int compare(Jugador j1, Jugador j2) {
                return j2.getPuntuacion() - j1.getPuntuacion();
            }
        });

        return jugadores;
    }
}