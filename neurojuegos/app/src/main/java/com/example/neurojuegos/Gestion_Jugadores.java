package com.example.neurojuegos;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.content.ContentValues;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Spinner;
import android.widget.TextView;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;

public class Gestion_Jugadores extends AppCompatActivity {

    // Declarar la instancia de la base de datos
    private AdminSQLiteOpenHelper BaseDeDatos;

    // Declarar los EditTexts de la actividad
    private EditText et1_nombre, et2_edad;

    private ImageView boton_ranking;

    // Declarar la variable para almacenar el nombre del jugador actual
    private String nombreJugadorActual;
    private TextView tablero_nombre, tablero_edad, tablero_puntuaje;

    // Declarar los elementos de la interfaz de usuario
    private ImageView chains1, chains2;
    private Button boton_registrar, boton_Mostrar_RegistrarNuevoUsuario;
    private ImageView button_panel_niveles_gestion_jugadores,menu_panel;
    private Spinner spinnerUsuarios;

    // Declarar la variable para el índice seleccionado en el Spinner
    private int indiceSeleccionado = 0;

    // Declarar la clave para el estado del índice seleccionado en el Spinner
    private static final String KEY_INDICE_SELECCIONADO = "indiceSeleccionado";

    // Declarar la instancia de SharedPreferences
    private SharedPreferences preferences;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_gestion_jugadores);

        // Encontrar los EditTexts por ID
        et1_nombre = findViewById(R.id.rellenar_nombre);
        et2_edad = findViewById(R.id.rellenar_edad);

        // Encontrar los elementos de la interfaz de usuario por ID
        chains1 = findViewById(R.id.chains1);
        chains2 = findViewById(R.id.chains2);
        boton_registrar = findViewById(R.id.boton_registrar);
        boton_Mostrar_RegistrarNuevoUsuario = findViewById(R.id.boton_registrar_nuevo_usuario);
        tablero_nombre = findViewById(R.id.tablero_nombre);
        tablero_edad = findViewById(R.id.tablero_edad);
        tablero_puntuaje = findViewById(R.id.tablero_puntuaje);
        button_panel_niveles_gestion_jugadores = findViewById(R.id.button_panel_niveles_gestion_jugadores);
        spinnerUsuarios = findViewById(R.id.spinner_usuarios);

        // Encontrar la instancia de SharedPreferences
        preferences = getSharedPreferences("myPrefs", MODE_PRIVATE);

        // Mostrar el nombre del jugador actual guardado en SharedPreferences
        String savedNames = preferences.getString("nombreJugadorActual", "");
        tablero_nombre.setText(savedNames);

        // Configurar el botón para mostrar el panel de niveles
        button_panel_niveles_gestion_jugadores.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(Gestion_Jugadores.this, Inicio_Activity.class);
                startActivity(intent);
            }

        });

        menu_panel = findViewById(R.id.menu_panel);

        // Configurar el botón para mostrar el menu panel
        menu_panel.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(Gestion_Jugadores.this, Panel_Minijuegos.class);
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

        // Configurar el botón para registrar un nuevo usuario
        boton_registrar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Obtener los valores ingresados por el usuario
                String nombre = et1_nombre.getText().toString().trim();
                int edad = Integer.parseInt(et2_edad.getText().toString().trim());

                // Abrir la base de datos en modo escritura
                BaseDeDatos = new AdminSQLiteOpenHelper(Gestion_Jugadores.this, "administracion", null, 2);
                SQLiteDatabase db = BaseDeDatos.getWritableDatabase();

                // Crear un objeto ContentValues con los valores a insertar
                ContentValues values = new ContentValues();
                values.put("nombre", nombre);
                values.put("edad", edad);

                // Insertar los valores en la tabla
                db.insert("datos", null, values);

                // Cerrar la base de datos
                BaseDeDatos.close();

                // Limpiar los EditTexts y ocultarlos
                et1_nombre.setText("");
                et2_edad.setText("");
                et1_nombre.setVisibility(View.GONE);
                et2_edad.setVisibility(View.GONE);

                // Actualizar el spinner de usuarios
                llenarSpinnerUsuarios();
            }
        });

        // Configurar el botón para mostrar los EditTexts de registro de usuario
        boton_Mostrar_RegistrarNuevoUsuario.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                et1_nombre.setVisibility(View.VISIBLE);
                et2_edad.setVisibility(View.VISIBLE);
                chains1.setVisibility(View.VISIBLE);
                chains2.setVisibility(View.VISIBLE);
                boton_registrar.setVisibility(View.VISIBLE);
            }
        });

        // Configurar el Spinner de usuarios
        llenarSpinnerUsuarios();
        spinnerUsuarios.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {

            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                // Guardar el índice seleccionado en SharedPreferences
                indiceSeleccionado = position;
                preferences.edit().putInt(KEY_INDICE_SELECCIONADO, indiceSeleccionado).apply();

                // Obtener el nombre del jugador seleccionado
                String nombreJugador = parent.getItemAtPosition(position).toString();

                // Mostrar el nombre y la edad del jugador seleccionado en el tablero
                BaseDeDatos = new AdminSQLiteOpenHelper(Gestion_Jugadores.this, "administracion", null, 2);
                SQLiteDatabase db = BaseDeDatos.getReadableDatabase();
                Cursor cursor = db.rawQuery("SELECT edad, puntuacionFrasesVoF, puntuacionIdentifica, puntuacionPatrones, puntuacionCadenaNum, puntuacionPalabrasEncad, puntuacionMemo FROM datos WHERE nombre='" + nombreJugador + "'", null);

                if (cursor.moveToFirst()) {
                    int edad = cursor.getInt(0);
                    tablero_edad.setText(String.valueOf(edad));
                    int puntuacionFrasesVoF = cursor.getInt(1);
                    int puntuacionIdentifica = cursor.getInt(2);
                    int puntuacionPatrones = cursor.getInt(3);
                    int puntuacionCadenaNum = cursor.getInt(4);
                    int puntuacionPalabrasEncad = cursor.getInt(5);
                    int puntuacionMemo = cursor.getInt(6);
                    int puntuacionGeneral = puntuacionFrasesVoF + puntuacionIdentifica + puntuacionPatrones + puntuacionCadenaNum + puntuacionPalabrasEncad + puntuacionMemo;
                    tablero_puntuaje.setText(String.valueOf(puntuacionGeneral));
                    ContentValues values = new ContentValues();
                    values.put("puntuacion_general", puntuacionGeneral);
                    db.update("datos", values, "nombre=?", new String[]{nombreJugador});
                }

                tablero_nombre.setText(nombreJugador);

                // Guardar el nombre del jugador actual en SharedPreferences
                preferences.edit().putString("nombreJugadorActual", nombreJugador).apply();
                nombreJugadorActual = nombreJugador;
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {
                // No hacer nada
            }
        });
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
            AlertDialog.Builder builder = new AlertDialog.Builder(this);
            builder.setTitle("Ranking De Jugadores");
            builder.setMessage(mensaje.toString());
            builder.setPositiveButton("Aceptar", null);
            builder.show();
        }
    
        private ArrayList<Jugador> obtenerRanking() {
            // Obtener los jugadores registrados en la base de datos
            BaseDeDatos = new AdminSQLiteOpenHelper(Gestion_Jugadores.this, "administracion", null, 2);
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

    public Spinner getSpinnerUsuarios() {
        return spinnerUsuarios;
    }

    /**
     * Llena el Spinner de usuarios con los nombres de los jugadores registrados en la base de datos.
     */
    private void llenarSpinnerUsuarios() {
        // Obtener los nombres de los jugadores registrados en la base de datos
        ArrayList<String> nombresJugadores = new ArrayList<>();
        BaseDeDatos = new AdminSQLiteOpenHelper(Gestion_Jugadores.this, "administracion", null, 2);
        SQLiteDatabase db = BaseDeDatos.getReadableDatabase();
        Cursor cursor = db.rawQuery("SELECT nombre FROM datos", null);
        if (cursor.moveToFirst()) {
            do {
                nombresJugadores.add(cursor.getString(0));
            } while (cursor.moveToNext());
        }

        // Configurar el adaptador del Spinner
        ArrayAdapter<String> adapter = new ArrayAdapter<>(Gestion_Jugadores.this, android.R.layout.simple_spinner_item, nombresJugadores);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinnerUsuarios.setAdapter(adapter);

        // Seleccionar el índice guardado en SharedPreferences
        indiceSeleccionado = preferences.getInt(KEY_INDICE_SELECCIONADO, 0);
        spinnerUsuarios.setSelection(indiceSeleccionado);
    }
}