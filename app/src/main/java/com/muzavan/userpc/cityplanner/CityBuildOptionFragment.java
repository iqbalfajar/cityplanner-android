package com.muzavan.userpc.cityplanner;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.support.v7.app.ActionBar;
import android.support.v7.widget.Toolbar;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

/**
 * Created by user pc on 5/24/2016.
 */
public class CityBuildOptionFragment extends Fragment {
    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        final View out =  inflater.inflate(R.layout.fragment_city_build_option,container,false);
        ImageView btnRumah = (ImageView) out.findViewById(R.id.btn_rumah);
        ImageView btnHotel = (ImageView) out.findViewById(R.id.btn_hotel);
        ImageView btnMarket = (ImageView) out.findViewById(R.id.btn_market);

        btnHotel.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toolbar toolbar = (Toolbar) getActivity().findViewById(R.id.toolbar);
                toolbar.setTitle("Bangun Hotel");
                CityBuildFragment fragment = new CityBuildFragment();
                getFragmentManager().beginTransaction()
                        .replace(R.id.main_layout, fragment)
                        .addToBackStack(null)
                        .commit();
            }
        });

        btnRumah.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toolbar toolbar = (Toolbar) getActivity().findViewById(R.id.toolbar);
                toolbar.setTitle("Bangun Rumah");
                CityBuildFragment fragment = new CityBuildFragment();
                getFragmentManager().beginTransaction()
                        .replace(R.id.main_layout, fragment)
                        .addToBackStack(null)
                        .commit();
            }
        });

        btnMarket.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toolbar toolbar = (Toolbar) getActivity().findViewById(R.id.toolbar);
                toolbar.setTitle("Bangun Minimarket");
                CityBuildFragment fragment = new CityBuildFragment();
                getFragmentManager().beginTransaction()
                        .replace(R.id.main_layout, fragment)
                        .addToBackStack(null)
                        .commit();
            }
        });
        return out;
    }
}