package com.example.neurojuegos;


import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.view.View;
import android.widget.ImageView;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

public class Inicio_Activity extends AppCompatActivity {

    private ImageView medalla1;
    private Spinner spinnerJugadores;

    private String usuarioActual = "";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_inicio);

        medalla1 = findViewById(R.id.medalla1);

        // Obtener el valor del nombre de usuario pasado por el Intent
        String nombreUsuario = getIntent().getStringExtra("nombre_usuario");

        // Actualizar el contenido del TextView usuario_actual2
        TextView usuarioActual2 = findViewById(R.id.usuario_actual2);
        usuarioActual2.setText(nombreUsuario);

        // Obtener el nombre del jugador actual de las preferencias compartidas
        SharedPreferences preferences = getSharedPreferences("myPrefs", MODE_PRIVATE);
        String nombreJugadorActual = preferences.getString("nombreJugadorActual", "");
        usuarioActual2.setText(nombreJugadorActual);

        // Obtener una referencia a la base de datos
        SQLiteDatabase db = new AdminSQLiteOpenHelper(this, "administracion", null, 2).getReadableDatabase();

        String[] projection = {
                "nombre",
                "(puntuacionFrasesVoF + puntuacionIdentifica + puntuacionPatrones + puntuacionCadenaNum + puntuacionPalabrasEncad + puntuacionMemo) AS puntuacionTotal"
        };

        String sortOrder = "puntuacionTotal DESC";

        Cursor cursor = db.query(
                "datos",
                projection,
                null,
                null,
                null,
                null,
                sortOrder
        );

        Jugador jugadorConMayorPuntuacion = null;
        int mayorPuntuacion = Integer.MIN_VALUE;
        while (cursor.moveToNext()) {
            String nombre = cursor.getString(cursor.getColumnIndexOrThrow("nombre"));
            int puntuacionTotal = cursor.getInt(cursor.getColumnIndexOrThrow("puntuacionTotal"));
            if (puntuacionTotal > mayorPuntuacion) {
                mayorPuntuacion = puntuacionTotal;
                jugadorConMayorPuntuacion = new Jugador(nombre, puntuacionTotal);
            }
        }
        cursor.close();

        // Obtener el nombre del usuario actual
        if (nombreUsuario != null) {
            usuarioActual = nombreUsuario;
        }

        // Comparar el nombre del usuario actual con el nombre del jugador con mayor puntuación
        if (jugadorConMayorPuntuacion != null && usuarioActual.equals(jugadorConMayorPuntuacion.getNombre())) {
            medalla1.setVisibility(View.VISIBLE);
        } else {
            medalla1.setVisibility(View.GONE);
        }
    }

    public void abrirImagenAjustes(View view) {
        Intent intent = new Intent(this, AjustesActivity.class);
        startActivity(intent);
    }

    public void Ir_A_Minijuegos(View view) {
        // Obtener el valor del nombre de usuario guardado en las preferencias compartidas
        SharedPreferences preferences = getSharedPreferences("myPrefs", MODE_PRIVATE);
        String usuario_actual2 = preferences.getString("nombreJugadorActual", "");

        if (usuario_actual2.isEmpty()) {
            // Mostrar un mensaje de error si el usuario no ha iniciado sesión
            Toast.makeText(this, "Debe iniciar sesión para acceder al panel de minijuegos", Toast.LENGTH_SHORT).show();
        } else {
            // Si el usuario ha iniciado sesión, ir al panel de minijuegos
            Intent intent = new Intent(this, Panel_Minijuegos.class);
            startActivity(intent);
        }
    }

    public void Ir_A_Gestion_Jugadores(View view) {
        Intent intent = new Intent(this, Gestion_Jugadores.class);
        startActivity(intent);
    }
}