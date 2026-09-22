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
import android.widget.ImageView;
import android.widget.RadioButton;
import android.widget.TextView;
import android.widget.Toast;

public class FrasesVoF_6nivel extends AppCompatActivity {
    private TextView puntuajeTextView6;
    private String nombreJugadorActual;
    private int nivelActual=6;

    int puntos=0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_frases_vo_f6nivel);
        puntuajeTextView6=(TextView)findViewById(R.id.puntuaje_frasesvof6) ;



        // Obtener la referencia del botón verificar
        Button verificarButton6 = findViewById(R.id.verificar6activity_vof);

        // Agregar el método onClick al botón verificar
        verificarButton6.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Verificar6Respuesta();
            }
        });

        // Obtener la referencia del botón volver a niveles
        ImageView regresarANiveles6 = findViewById(R.id.regresarANiveles6);

        // Agregar el método onClick del botón volver a niveles
        regresarANiveles6.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Volver_A_Niveles();
            }
        });
    }

    public void Volver_A_Niveles() {
        Intent i = new Intent(this, niveles_frasesvof.class);
        startActivity(i);

    }

    public void Verificar6Respuesta() {
        // Obtener las referencias a los RadioButtons seleccionados en cada RadioGroup
        RadioButton rbVerdaderoSeleccionado1 = findViewById(R.id.radio1_frasev);
        RadioButton rbFalsoSeleccionado2 = findViewById(R.id.radio2_frasef);
        RadioButton rbVerdaderoSeleccionado3 = findViewById(R.id.radio3_frasev);
        RadioButton rbFalsoSeleccionado4 = findViewById(R.id.radio4_frasef);

        // Verificar si las respuestas son correctas
        if (rbFalsoSeleccionado2.isChecked() && rbFalsoSeleccionado4.isChecked()) {
            // Obtener la puntuación actual del TextView
            puntos = 2;

            // Actualizar el valor del puntuaje en el TextView
            puntuajeTextView6.setText(String.valueOf(puntos));
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////se mostro puntos
            int valor = 7;

            AdminSQLiteOpenHelper admin = new AdminSQLiteOpenHelper(this, "administracion", null, 2);
            SQLiteDatabase db = admin.getWritableDatabase();
            SharedPreferences preferences = getSharedPreferences("myPrefs", MODE_PRIVATE);
            String savedNames = preferences.getString("nombreJugadorActual", "");


            Cursor cursor = db.query("datos", new String[]{"nivel"}, "nombre=?", new String[]{savedNames}, null, null, null);
            int nivelmax = 0;
            if (cursor.moveToFirst()) {
                nivelmax = cursor.getInt(0);
            }

            if(valor > nivelmax) {
                // Construir los valores a actualizar
                ContentValues values = new ContentValues();
                values.put("nivel", valor);

                // Actualizar la fila correspondiente en la tabla 'datos'
                db.update("datos", values, "nombre = ?", new String[]{savedNames});

                // Cerrar la base de datos
                db.close();
            }
            guardarBaseDedatos();

            Toast.makeText(this, "¡Correcto! Has ganado 2 puntos.", Toast.LENGTH_SHORT).show();

            nivelActual=6;
            // Después de incrementar nivelActual
            Intent intent = new Intent(FrasesVoF_6nivel.this, Victoria.class);
            intent.putExtra("nivelActual", nivelActual);
            startActivity(intent);


        } else {
            Toast.makeText(this, "Lo siento, respuesta incorrecta.", Toast.LENGTH_SHORT).show();
        }
    }

    private void guardarBaseDedatos(){

        // Obtener la puntuación acumulada actual desde la base de datos
        AdminSQLiteOpenHelper admin = new AdminSQLiteOpenHelper(this, "administracion", null, 2);
        SQLiteDatabase db = admin.getWritableDatabase();
        SharedPreferences preferences = getSharedPreferences("myPrefs", MODE_PRIVATE);
        String savedNames = preferences.getString("nombreJugadorActual", "");
        Cursor cursor = db.query("datos", new String[]{"puntuacionFrasesVoF"}, "nombre=?", new String[]{savedNames}, null, null, null);
        int puntuacionAcumulada = 0;
        if (cursor.moveToFirst()) {
            puntuacionAcumulada = cursor.getInt(0);
        }
        cursor.close();

        // Sumar la puntuación actual a la puntuación acumulada
        int puntuacionNueva = puntos + puntuacionAcumulada;

        // Crear un ContentValues con los valores a insertar
        ContentValues registro = new ContentValues();
        registro.put("puntuacionFrasesVoF", puntuacionNueva);

        // Actualizar la base de datos con la nueva puntuación acumulada
        db.update("datos", registro, "nombre=?", new String[]{savedNames});
        db.close();




    }
}
