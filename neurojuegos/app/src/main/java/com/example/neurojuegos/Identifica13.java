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
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

public class Identifica13 extends AppCompatActivity {
    private TextView puntuajeTextView13;
    private String nombreJugadorActual;
    private int nivelActual = 13;
    private Button reiniciarButton;
    private Button verificarButton13;

    int puntos = 0;

    TextView textView1;
    TextView textView2;
    TextView textView3;
    TextView textView4;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_identifica13);
        puntuajeTextView13 = (TextView) findViewById(R.id.puntuaje_identifica13);



        // Obtener la referencia del botón verificar
        Button verificarButton13 =(Button) findViewById(R.id.verificar13activityidentifica);

        // Agregar el método onClick al botón verificar
        verificarButton13.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Verificar13Respuesta();
            }
        });

        // Obtener la referencia del botón volver a niveles
        ImageView regresarANiveles13 = findViewById(R.id.regresarANiveles13);

        // Agregar el método onClick del botón volver a niveles
        regresarANiveles13.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Volver_A_Niveles();
            }
        });


    }

    public void ReiniciarNivel() {
        // Reiniciar el nivel actual
        nivelActual = 13;

        // Volver a iniciar la actividad actual
        Intent intent = getIntent();
        finish();
        startActivity(intent);
    }

    public void Volver_A_Niveles() {
        Intent i = new Intent(this, niveles_identifica.class);
        startActivity(i);
    }


    public void Verificar13Respuesta() {
        // Obtener las referencias a los RadioButtons seleccionados en cada RadioGroup
        CheckBox chSeleccionado1 = findViewById(R.id.radio1_identifica);
        CheckBox chSeleccionado2 = findViewById(R.id.radio2_identifica);
        CheckBox chSeleccionado3 = findViewById(R.id.radio3_identifica);
        CheckBox chSeleccionado4 = findViewById(R.id.radio4_identifica);


        // Verificar si las respuestas son correctas
        if (chSeleccionado1.isChecked() && chSeleccionado3.isChecked() && !chSeleccionado2.isChecked() && !chSeleccionado4.isChecked() ) {

            Toast.makeText(this, "¡Perfectoo!! Has ganado 2 puntos.", Toast.LENGTH_SHORT).show();

            // Después de incrementar nivelActual
            Intent intent = new Intent(Identifica13.this, VictoriaIdentifica.class);
            intent.putExtra("nivel_maxIdentifica", nivelActual);
            startActivity(intent);
        }

        else {
            Toast.makeText(this, "Lo siento, respuesta incorrecta.Verifique las opciones marcadas", Toast.LENGTH_SHORT).show();        }

        // Obtener la puntuación actual del TextView
        puntos = 2;

        // Actualizar el valor del puntuaje en el TextView
        puntuajeTextView13.setText(String.valueOf(puntos));
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////se mostro puntos
        int valor = 14;

        AdminSQLiteOpenHelper admin = new AdminSQLiteOpenHelper(this, "administracion", null, 2);
        SQLiteDatabase db = admin.getWritableDatabase();
        SharedPreferences preferences = getSharedPreferences("myPrefs", MODE_PRIVATE);
        String savedNames = preferences.getString("nombreJugadorActual", "");


        Cursor cursor = db.query("datos", new String[]{"nivel_maxIdentifica"}, "nombre=?", new String[]{savedNames}, null, null, null);
        int nivelmax = 0;
        if (cursor.moveToFirst()) {
            nivelmax = cursor.getInt(0);
        }

        if(valor > nivelmax) {
            // Construir los valores a actualizar
            ContentValues values = new ContentValues();
            values.put("nivel_maxIdentifica", valor);

            // Actualizar la fila correspondiente en la tabla 'datos'
            db.update("datos", values, "nombre = ?", new String[]{savedNames});

            // Cerrar la base de datos
            db.close();
        }

        guardarBaseDedatos();

        nivelActual = 14;

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