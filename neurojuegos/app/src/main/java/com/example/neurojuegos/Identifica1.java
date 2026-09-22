package com.example.neurojuegos;

import androidx.appcompat.app.AppCompatActivity;

import android.content.ContentValues;
import android.content.Intent;
import android.content.SharedPreferences;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

public class Identifica1 extends AppCompatActivity {
    private TextView puntuajeTextView1;
    private String nombreJugadorActual;
    private int nivelActual = 1;

    int puntos = 0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_identifica1);
        puntuajeTextView1 = (TextView) findViewById(R.id.puntuaje_identifica1);

        // Obtener la referencia del botón verificar
        Button verificarButton1 =(Button) findViewById(R.id.verificar1activityidentifica);

        // Agregar el método onClick al botón verificar
        verificarButton1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Verificar1Respuesta();
            }
        });

        // Obtener la referencia del botón volver a niveles
        ImageView regresar_a_niveles = findViewById(R.id.regresarANiveles);

        // Agregar el método onClick del botón volver a niveles
        regresar_a_niveles.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Volver_A_Niveles();
            }
        });

    }

    public void ReiniciarNivel() {
        // Reiniciar el nivel actual
        nivelActual = 1;

        // Volver a iniciar la actividad actual
        Intent intent = getIntent();
        finish();
        startActivity(intent);
    }

    public void Volver_A_Niveles() {
        Intent i = new Intent(this, niveles_identifica.class);
        startActivity(i);
    }


    public void Verificar1Respuesta() {
        // Obtener las referencias a los RadioButtons seleccionados en cada RadioGroup
        CheckBox rbSeleccionado1 = findViewById(R.id.radio1_identifica);
        CheckBox rbSeleccionado2 = findViewById(R.id.radio2_identifica);
        CheckBox rbSeleccionado3 = findViewById(R.id.radio3_identifica);
        CheckBox rbSeleccionado4 = findViewById(R.id.radio4_identifica);

        // Verificar si las respuestas son correctas
        if (rbSeleccionado1.isChecked() && rbSeleccionado2.isChecked() && !rbSeleccionado3.isChecked() && !rbSeleccionado4.isChecked()) {
            Toast.makeText(this, "¡Perfectoo!! Has ganado 2 puntos.", Toast.LENGTH_SHORT).show();

            // Obtener la puntuación actual del TextView
            int puntosActuales = Integer.parseInt(puntuajeTextView1.getText().toString());

            // Actualizar el valor del puntuaje en el TextView
            int puntosNuevos = puntosActuales + 2;
            puntuajeTextView1.setText(String.valueOf(puntosNuevos));

            // Actualizar el valor del puntuaje en SharedPreferences
            SharedPreferences preferences = getSharedPreferences("myPrefs", MODE_PRIVATE);
            SharedPreferences.Editor editor = preferences.edit();
            editor.putInt("puntuacionIdentifica", puntosNuevos);
            editor.apply();

            // Obtener el nivel máximo actual del jugador
            AdminSQLiteOpenHelper admin = new AdminSQLiteOpenHelper(this, "administracion", null, 2);
            SQLiteDatabase db = admin.getWritableDatabase();
            String savedNames = preferences.getString("nombreJugadorActual", "");
            Cursor cursor = db.query("datos", new String[]{"nivel_maxIdentifica"}, "nombre=?", new String[]{savedNames}, null, null, null);
            int nivelmax = 0;
            if (cursor.moveToFirst()) {
                nivelmax = cursor.getInt(0);
            }
            cursor.close();

            // Actualizar el nivel máximo si el nuevo valor es mayor
            if (puntosNuevos > nivelmax) {
                ContentValues values = new ContentValues();
                values.put("nivel_maxIdentifica", puntosNuevos);
                db.update("datos", values, "nombre = ?", new String[]{savedNames});
            }

            // Actualizar la puntuación acumulada en la base de datos
            cursor = db.query("datos", new String[]{"puntuacionIdentifica"}, "nombre=?", new String[]{savedNames}, null, null, null);
            int puntuacionAcumulada = 0;
            if (cursor.moveToFirst()) {
                puntuacionAcumulada = cursor.getInt(0);
            }
            cursor.close();

            int puntuacionNueva = puntosNuevos + puntuacionAcumulada;
            ContentValues registro = new ContentValues();
            registro.put("puntuacionIdentifica", puntuacionNueva);
            db.update("datos", registro, "nombre=?", new String[]{savedNames});

            // Cerrar la base de datos
            db.close();

            // Después de incrementar nivelActual
            Intent intent = new Intent(Identifica1.this, VictoriaIdentifica.class);
            intent.putExtra("nivel_maxIdentifica", nivelActual);
            startActivity(intent);
        } else {
            Toast.makeText(this, "Lo siento, respuesta incorrecta. Verifique las opciones marcadas", Toast.LENGTH_SHORT).show();
        }
    }

    private void guardarBaseDedatos(){

        // Obtener la puntuación acumulada actual desde la base de datos
        AdminSQLiteOpenHelper admin = new AdminSQLiteOpenHelper(this, "administracion", null, 2);
        SQLiteDatabase db = admin.getWritableDatabase();
        SharedPreferences preferences = getSharedPreferences("myPrefs", MODE_PRIVATE);
        String savedNames = preferences.getString("nombreJugadorActual", "");
        Cursor cursor = db.query("datos", new String[]{"puntuacionIdentifica"}, "nombre=?", new String[]{savedNames}, null, null, null);
        int puntuacionAcumulada = 0;
        if (cursor.moveToFirst()) {
            puntuacionAcumulada = cursor.getInt(0);
        }
        cursor.close();

        // Sumar la puntuación actual a la puntuación acumulada
        int puntuacionNueva = puntos + puntuacionAcumulada;

        // Crear un ContentValues con los valores a insertar
        ContentValues registro = new ContentValues();
        registro.put("puntuacionIdentifica", puntuacionNueva);

        // Actualizar la base de datos con la nueva puntuación acumulada
        db.update("datos", registro, "nombre=?", new String[]{savedNames});
        db.close();


    }
}